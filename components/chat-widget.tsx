"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI của Inox Việt Nam. Tôi có thể giúp bạn tìm hiểu về sản phẩm inox, báo giá, và tư vấn kỹ thuật. Bạn cần hỗ trợ gì?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 group"
        >
          <MessageCircle className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
          <span className="sr-only">Mở chat với AI</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card
        className={cn(
          "w-80 md:w-96 shadow-2xl border-0 transition-all duration-300",
          isMinimized ? "h-14" : "h-[500px] md:h-[600px]",
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <CardTitle className="text-sm font-medium">Trợ lý AI Inox</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-64px)]">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn("flex gap-2 max-w-[85%]", message.role === "user" ? "ml-auto" : "mr-auto")}
                    >
                      {message.role === "assistant" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-blue-600" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "rounded-lg px-3 py-2 text-sm",
                          message.role === "user" ? "bg-blue-600 text-white ml-2" : "bg-gray-100 text-gray-900",
                        )}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p
                          className={cn(
                            "text-xs mt-1 opacity-70",
                            message.role === "user" ? "text-blue-100" : "text-gray-500",
                          )}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-2 max-w-[85%] mr-auto">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            <div className="flex-shrink-0 p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập tin nhắn..."
                  disabled={isLoading}
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Gửi tin nhắn</span>
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Trợ lý AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
