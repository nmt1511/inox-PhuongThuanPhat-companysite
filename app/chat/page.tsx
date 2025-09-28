"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, ArrowLeft, Trash2, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI của Inox Việt Nam. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các sản phẩm inox chất lượng cao\n• Tư vấn lựa chọn sản phẩm phù hợp\n• Cung cấp thông tin kỹ thuật chi tiết\n• Hỗ trợ báo giá và tư vấn ứng dụng\n\nBạn có câu hỏi gì về sản phẩm inox không?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

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
        content:
          "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi qua hotline: 0123-456-789",
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

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Xin chào! Tôi là trợ lý AI của Inox Việt Nam. Tôi có thể giúp bạn:\n\n• Tìm hiểu về các sản phẩm inox chất lượng cao\n• Tư vấn lựa chọn sản phẩm phù hợp\n• Cung cấp thông tin kỹ thuật chi tiết\n• Hỗ trợ báo giá và tư vấn ứng dụng\n\nBạn có câu hỏi gì về sản phẩm inox không?",
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const exportChat = () => {
    const chatContent = messages
      .map(
        (msg) =>
          `[${new Date(msg.timestamp).toLocaleString("vi-VN")}] ${msg.role === "user" ? "Bạn" : "Trợ lý AI"}: ${msg.content}`,
      )
      .join("\n\n")

    const blob = new Blob([chatContent], { type: "text/plain;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `chat-inox-${new Date().toISOString().split("T")[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Về trang chủ
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">Trợ lý AI Inox</h1>
                  <p className="text-sm text-gray-500">Tư vấn sản phẩm inox chuyên nghiệp</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Đang hoạt động
              </Badge>
              <Button variant="outline" size="sm" onClick={exportChat}>
                <Download className="h-4 w-4 mr-2" />
                Xuất chat
              </Button>
              <Button variant="outline" size="sm" onClick={clearChat}>
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-64px)] flex flex-col">
        <Card className="flex-1 flex flex-col shadow-lg overflow-hidden">
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex gap-4 max-w-[85%]",
                        message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto",
                      )}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                          message.role === "user" ? "bg-blue-600" : "bg-gradient-to-r from-blue-100 to-blue-200",
                        )}
                      >
                        {message.role === "user" ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-white border border-gray-200 text-gray-900 shadow-sm",
                          )}
                        >
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 px-1">{formatTime(message.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex gap-4 max-w-[85%] mr-auto">
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
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

            {/* Input Area */}
            <div className="flex-shrink-0 p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Textarea
                    ref={textareaRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Nhập câu hỏi về sản phẩm inox..."
                    disabled={isLoading}
                    className="min-h-[60px] max-h-32 resize-none text-sm"
                    rows={2}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="lg"
                  className="px-6 h-[60px] bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Gửi tin nhắn</span>
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-500">Nhấn Enter để gửi, Shift + Enter để xuống dòng</p>
                <p className="text-xs text-gray-500">
                  Trợ lý AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
