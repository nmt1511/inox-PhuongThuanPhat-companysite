"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Search, Save, X } from "lucide-react"
import { FirebaseDB, type Tag } from "@/lib/firebase-db"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/firebase-auth"

export default function TagsPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  })

  useEffect(() => {
    const unsubscribe = FirebaseDB.onTagsChange((updatedTags) => {
      setTags(updatedTags)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
      .replace(/[èéẹẻẽêềếệểễ]/g, "e")
      .replace(/[ìíịỉĩ]/g, "i")
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
      .replace(/[ùúụủũưừứựửữ]/g, "u")
      .replace(/[ỳýỵỷỹ]/g, "y")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name),
    }))
  }

  const resetForm = () => {
    setFormData({ name: "", slug: "" })
    setShowAddForm(false)
    setEditingTag(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập tên thẻ",
        variant: "destructive",
      })
      return
    }

    try {
      // Check for duplicate slug
      const existingTag = await FirebaseDB.getTagBySlug(formData.slug)
      if (existingTag && existingTag.id !== editingTag?.id) {
        toast({
          title: "Lỗi",
          description: "Slug này đã tồn tại",
          variant: "destructive",
        })
        return
      }

      if (editingTag) {
        await FirebaseDB.updateTag(editingTag.id!, formData, user?.uid || "admin")
        toast({
          title: "Thành công",
          description: "Đã cập nhật thẻ",
        })
      } else {
        await FirebaseDB.addTag(formData, user?.uid || "admin")
        toast({
          title: "Thành công",
          description: "Đã thêm thẻ mới",
        })
      }

      resetForm()
    } catch (error) {
      console.error("Error saving tag:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu thẻ",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
    setFormData({
      name: tag.name,
      slug: tag.slug,
    })
    setShowAddForm(true)
  }

  const handleDelete = async (tag: Tag) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa thẻ "${tag.name}"?`)) return

    try {
      await FirebaseDB.deleteTag(tag.id!, user?.uid || "admin")
      toast({
        title: "Thành công",
        description: "Đã xóa thẻ",
      })
    } catch (error) {
      console.error("Error deleting tag:", error)
      toast({
        title: "Lỗi",
        description: "Không thể xóa thẻ",
        variant: "destructive",
      })
    }
  }

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý thẻ</h1>
          <p className="text-gray-600 mt-1">Quản lý các thẻ phân loại cho bài viết</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm thẻ mới
        </Button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTag ? "Chỉnh sửa thẻ" : "Thêm thẻ mới"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên thẻ *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="VD: Kỹ thuật"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug URL *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="ky-thuat"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  {editingTag ? "Cập nhật" : "Thêm thẻ"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Tìm kiếm thẻ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách thẻ ({filteredTags.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTags.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "Không tìm thấy thẻ nào" : "Chưa có thẻ nào"}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTags.map((tag) => (
                <div key={tag.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{tag.name}</h3>
                      <p className="text-sm text-gray-500">/{tag.slug}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(tag)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(tag)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(tag.created_at).toLocaleDateString("vi-VN")}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
