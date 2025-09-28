"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { type User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"
import { ActivityLogger } from "./activity-logger"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      await ActivityLogger.logLogin(userCredential.user.uid, true, `Đăng nhập thành công với email: ${email}`)
    } catch (error) {
      await ActivityLogger.logLogin(
        "unknown",
        false,
        `Đăng nhập thất bại với email: ${email} - ${error instanceof Error ? error.message : "Unknown error"}`,
      )
      throw error
    }
  }

  const logout = async () => {
    try {
      if (user) {
        await ActivityLogger.logLogout(user.uid)
      }
      await signOut(auth)
    } catch (error) {
      await ActivityLogger.logSystemError(`Logout failed: ${error instanceof Error ? error.message : "Unknown error"}`)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
