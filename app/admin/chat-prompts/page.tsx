"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Plus,
  Edit,
  Trash2,
  Bot,
  CheckCircle,
  Circle,
  Database,
  Search,
  TestTube,
  Copy,
  Star,
  Filter,
} from "lucide-react"
import { FirebaseDB, type ChatPromptConfig } from "@/lib/firebase-db"
import { useAuth } from "@/lib/firebase-auth"
import { toast } from "sonner"

const PROMPT_CATEGORIES = [
  "Tư vấn sản phẩm",
  "Hỗ trợ kỹ thuật",
  "Chăm sóc khách hàng",
  "Bán hàng",
  "Thông tin công ty",
  "Khác",
]

export default function ChatPromptsPage() {
  const [prompts, setPrompts] = useState<ChatPromptConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<ChatPromptConfig | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedStatus, setSelectedStatus] = useState("Tất cả")
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [testPrompt, setTestPrompt] = useState<ChatPromptConfig | null>(null)
  const [testInput, setTestInput] = useState("")
  const [testOutput, setTestOutput] = useState("")
  const [isTesting, setIsTesting] = useState(false)
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: "",
    prompt: "",
    category: "Tư vấn sản phẩm",
    isActive: false,
    includeProducts: true,
    includeNews: true,
    includeCategories: true,
    includeContacts: true,
  })

  useEffect(() => {
    loadPrompts()
  }, [])

  const loadPrompts = async () => {
    try {
      setLoading(true)
      const data = await FirebaseDB.getChatPrompts()
      setPrompts(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    } catch (error) {
      console.error("Error loading prompts:", error)
      toast.error("Không thể tải danh sách prompt")
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      prompt: "",
      category: "Tư vấn sản phẩm",
      isActive: false,
      includeProducts: true,
      includeNews: true,
      includeCategories: true,
      includeContacts: true,
    })
    setEditingPrompt(null)
  }

  const handleOpenDialog = (prompt?: ChatPromptConfig) => {
    if (prompt) {
      setEditingPrompt(prompt)
      setFormData({
        name: prompt.name,
        prompt: prompt.prompt,
        category: (prompt as any).category || "Tư vấn sản phẩm",
        isActive: prompt.isActive,
        includeProducts: prompt.includeProducts,
        includeNews: prompt.includeNews,
        includeCategories: prompt.includeCategories,
        includeContacts: prompt.includeContacts,
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    resetForm()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.prompt.trim()) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }

    try {
      if (editingPrompt) {
        await FirebaseDB.updateChatPrompt(editingPrompt.id!, formData, user?.uid)
        toast.success("Cập nhật prompt thành công")
      } else {
        await FirebaseDB.addChatPrompt(formData, user?.uid)
        toast.success("Tạo prompt thành công")
      }

      handleCloseDialog()
      loadPrompts()
    } catch (error) {
      console.error("Error saving prompt:", error)
      toast.error("Có lỗi xảy ra khi lưu prompt")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await FirebaseDB.deleteChatPrompt(id, user?.uid)
      toast.success("Xóa prompt thành công")
      loadPrompts()
    } catch (error) {
      console.error("Error deleting prompt:", error)
      toast.error("Có lỗi xảy ra khi xóa prompt")
    }
  }

  const handleToggleActive = async (prompt: ChatPromptConfig) => {
    try {
      if (!prompt.isActive) {
        await FirebaseDB.setActiveChatPrompt(prompt.id!, user?.uid)
        toast.success("Đã kích hoạt prompt")
      } else {
        await FirebaseDB.updateChatPrompt(prompt.id!, { isActive: false }, user?.uid)
        toast.success("Đã tắt prompt")
      }
      loadPrompts()
    } catch (error) {
      console.error("Error toggling prompt:", error)
      toast.error("Có lỗi xảy ra khi thay đổi trạng thái prompt")
    }
  }

  const getDataSourceBadges = (prompt: ChatPromptConfig) => {
    const sources = []
    if (prompt.includeProducts) sources.push("Sản phẩm")
    if (prompt.includeNews) sources.push("Tin tức")
    if (prompt.includeCategories) sources.push("Danh mục")
    if (prompt.includeContacts) sources.push("Liên hệ")
    return sources
  }

  const filteredPrompts = prompts.filter((prompt) => {
    const matchesSearch =
      prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "Tất cả" || (prompt as any).category === selectedCategory

    const matchesStatus =
      selectedStatus === "Tất cả" ||
      (selectedStatus === "Hoạt động" && prompt.isActive) ||
      (selectedStatus === "Tạm dừng" && !prompt.isActive)

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleTestPrompt = (prompt: ChatPromptConfig) => {
    setTestPrompt(prompt)
    setTestInput("")
    setTestOutput("")
    setIsTestDialogOpen(true)
  }

  const runPromptTest = async () => {
    if (!testPrompt || !testInput.trim()) return

    setIsTesting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setTestOutput(`Đây là phản hồi mô phỏng dựa trên prompt "${testPrompt.name}" với đầu vào: "${testInput}"`)
      toast.success("Test prompt thành công")
    } catch (error) {
      console.error("Error testing prompt:", error)
      toast.error("Có lỗi xảy ra khi test prompt")
    } finally {
      setIsTesting(false)
    }
  }

  const handleCopyPrompt = (prompt: ChatPromptConfig) => {
    navigator.clipboard.writeText(prompt.prompt)
    toast.success("Đã copy prompt vào clipboard")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý AI Chat Prompts</h1>
          <p className="text-gray-600 mt-1">Cấu hình prompt và nguồn dữ liệu cho trợ lý AI</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Tạo Prompt Mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPrompt ? "Chỉnh sửa Prompt" : "Tạo Prompt Mới"}</DialogTitle>
              <DialogDescription>Cấu hình prompt và nguồn dữ liệu cho trợ lý AI</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Prompt</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Tư vấn sản phẩm inox"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROMPT_CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prompt">Nội dung Prompt</Label>
                <Textarea
                  id="prompt"
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder="Nhập prompt hướng dẫn cho AI..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Nguồn dữ liệu bao gồm:</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeProducts"
                      checked={formData.includeProducts}
                      onCheckedChange={(checked) => setFormData({ ...formData, includeProducts: checked })}
                    />
                    <Label htmlFor="includeProducts">Sản phẩm</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeNews"
                      checked={formData.includeNews}
                      onCheckedChange={(checked) => setFormData({ ...formData, includeNews: checked })}
                    />
                    <Label htmlFor="includeNews">Tin tức</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeCategories"
                      checked={formData.includeCategories}
                      onCheckedChange={(checked) => setFormData({ ...formData, includeCategories: checked })}
                    />
                    <Label htmlFor="includeCategories">Danh mục</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="includeContacts"
                      checked={formData.includeContacts}
                      onCheckedChange={(checked) => setFormData({ ...formData, includeContacts: checked })}
                    />
                    <Label htmlFor="includeContacts">Thông tin liên hệ</Label>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
                <Label htmlFor="isActive">Kích hoạt prompt này</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Hủy
                </Button>
                <Button type="submit">{editingPrompt ? "Cập nhật" : "Tạo mới"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng prompts</p>
                <p className="text-2xl font-bold">{prompts.length}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đang hoạt động</p>
                <p className="text-2xl font-bold text-green-600">{prompts.filter((p) => p.isActive).length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tạm dừng</p>
                <p className="text-2xl font-bold text-gray-600">{prompts.filter((p) => !p.isActive).length}</p>
              </div>
              <Circle className="h-8 w-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Danh mục</p>
                <p className="text-2xl font-bold text-purple-600">
                  {new Set(prompts.map((p) => (p as any).category || "Khác")).size}
                </p>
              </div>
              <Filter className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm prompt..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả">Tất cả danh mục</SelectItem>
                {PROMPT_CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tất cả">Tất cả</SelectItem>
                <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                <SelectItem value="Tạm dừng">Tạm dừng</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Danh sách Prompts ({filteredPrompts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPrompts.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {prompts.length === 0 ? "Chưa có prompt nào được tạo" : "Không tìm thấy prompt phù hợp"}
              </p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={() => handleOpenDialog()}>
                {prompts.length === 0 ? "Tạo prompt đầu tiên" : "Tạo prompt mới"}
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên & Danh mục</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Nguồn dữ liệu</TableHead>
                    <TableHead>Ngày tạo</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrompts.map((prompt) => (
                    <TableRow key={prompt.id}>
                      <TableCell>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{prompt.name}</p>
                            {prompt.isActive && <Star className="h-4 w-4 text-yellow-500" />}
                          </div>
                          <Badge variant="outline" className="text-xs mt-1">
                            {(prompt as any).category || "Khác"}
                          </Badge>
                          <p className="text-sm text-gray-500 truncate max-w-xs mt-1">
                            {prompt.prompt.substring(0, 100)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleToggleActive(prompt)} className="p-1">
                            {prompt.isActive ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Circle className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                          <Badge variant={prompt.isActive ? "default" : "secondary"}>
                            {prompt.isActive ? "Đang hoạt động" : "Tạm dừng"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {getDataSourceBadges(prompt).map((source) => (
                            <Badge key={source} variant="outline" className="text-xs">
                              <Database className="h-3 w-3 mr-1" />
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(prompt.createdAt).toLocaleDateString("vi-VN")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTestPrompt(prompt)}
                            title="Test prompt"
                          >
                            <TestTube className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyPrompt(prompt)}
                            title="Copy prompt"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(prompt)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Xác nhận xóa</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Bạn có chắc chắn muốn xóa prompt "{prompt.name}"? Hành động này không thể hoàn tác.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(prompt.id!)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Xóa
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isTestDialogOpen} onOpenChange={setIsTestDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Test Prompt: {testPrompt?.name}</DialogTitle>
            <DialogDescription>Kiểm tra phản hồi của AI với prompt này</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testInput">Câu hỏi test</Label>
              <Textarea
                id="testInput"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                placeholder="Nhập câu hỏi để test prompt..."
                rows={3}
              />
            </div>

            {testOutput && (
              <div className="space-y-2">
                <Label>Phản hồi AI</Label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm">{testOutput}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestDialogOpen(false)}>
              Đóng
            </Button>
            <Button onClick={runPromptTest} disabled={!testInput.trim() || isTesting}>
              {isTesting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang test...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Chạy test
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
