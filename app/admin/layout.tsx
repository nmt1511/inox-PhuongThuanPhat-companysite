"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Newspaper,
  ImageIcon,
  MessageSquare,
  Settings,
  Activity,
  Menu,
  X,
  LogOut,
  Bot,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AuthProvider, useAuth } from "@/lib/firebase-auth"
import AdminAuthGuard from "@/components/admin-auth-guard"

const sidebarItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/products", icon: Package, label: "Quản lý sản phẩm" },
  { href: "/admin/categories", icon: FolderOpen, label: "Danh mục sản phẩm" },
  { href: "/admin/news", icon: Newspaper, label: "Tin tức & Dự án" },
  { href: "/admin/tags", icon: Tag, label: "Thẻ bài viết" },
  { href: "/admin/sliders", icon: ImageIcon, label: "Slider & Banner" },
  { href: "/admin/contacts", icon: MessageSquare, label: "Liên hệ & Tin nhắn" },
  { href: "/admin/chat-prompts", icon: Bot, label: "Quản lý AI Chat" },
  { href: "/admin/logs", icon: Activity, label: "Nhật ký hoạt động" },
  { href: "/admin/settings", icon: Settings, label: "Cài đặt" },
]

function AdminLayoutContent({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { logout, user } = useAuth()

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href))

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b">
            <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-6 px-3 pb-20">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href, item.exact)
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t bg-white">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Đăng xuất
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1">
          {/* Top bar */}
          <header className="flex items-center justify-between h-16 px-6 bg-white border-b shadow-sm">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <span className="hidden text-sm text-gray-600 sm:block">Xin chào, {user?.email}</span>
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full text-white">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  )
}
