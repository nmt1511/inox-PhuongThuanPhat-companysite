"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Upload, X, Loader2 } from "lucide-react"
import { FirebaseDB, type Category } from "@/lib/firebase-db"
import { CloudinaryUploader } from "@/lib/cloudinary"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/firebase-auth"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [uploadingImage, setUploadingImage] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    category_id: "",
    price: "",
    unit: "kg",
    stock: "",
    status: "active" as "active" | "inactive",
  })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await FirebaseDB.getCategories()
        setCategories(categoriesData.filter((cat) => cat.status === "active"))
      } catch (error) {
        console.error("Error loading categories:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách danh mục",
          variant: "destructive",
        })
      } finally {
        setLoadingCategories(false)
      }
    }

    loadCategories()
  }, [toast])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file hình ảnh",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Lỗi",
        description: "Kích thước file không được vượt quá 5MB",
        variant: "destructive",
      })
      return
    }

    setImageFile(file)
    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)

    setUploadingImage(true)
    try {
      const uploadResult = await CloudinaryUploader.uploadImage(file, "inox-products")
      handleInputChange("image_url", uploadResult.secure_url)

      toast({
        title: "Thành công",
        description: "Đã tải ảnh lên thành công",
      })
    } catch (error) {
      console.error("Image upload error:", error)
      toast({
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể tải ảnh lên",
        variant: "destructive",
      })
      removeImage()
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImagePreview("")
    handleInputChange("image_url", "")
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.category_id || !formData.price || !formData.stock) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Danh mục, Giá, Tồn kho)",
        variant: "destructive",
      })
      return
    }

    const price = Number.parseFloat(formData.price)
    const stock = Number.parseInt(formData.stock)

    if (isNaN(price) || price <= 0) {
      toast({
        title: "Lỗi",
        description: "Giá sản phẩm phải là số dương",
        variant: "destructive",
      })
      return
    }

    if (isNaN(stock) || stock < 0) {
      toast({
        title: "Lỗi",
        description: "Số lượng tồn kho phải là số không âm",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      await FirebaseDB.addProduct(
        {
          name: formData.name,
          image_url: formData.image_url,
          category_id: formData.category_id,
          price: price,
          unit: formData.unit,
          stock: stock,
          status: formData.status,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        user?.uid || "admin",
      )

      toast({
        title: "Thành công",
        description: "Đã thêm sản phẩm mới",
      })

      router.push("/admin/products")
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Lỗi",
        description: "Không thể lưu sản phẩm",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loadingCategories) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thêm sản phẩm mới</h1>
          <p className="text-gray-600 mt-1">Tạo sản phẩm inox mới</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin sản phẩm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Tên sản phẩm *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="VD: Tấm inox 304 dày 2mm"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="category_id">Danh mục *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange("category_id", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id!}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hình ảnh sản phẩm</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadingImage ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                      <p className="text-gray-600">Đang tải ảnh lên Cloudinary...</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Kéo thả hoặc click để tải ảnh</p>
                      <p className="text-sm text-gray-500 mb-4">Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={uploadingImage}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById("image-upload")?.click()}
                        disabled={uploadingImage}
                      >
                        Chọn ảnh
                      </Button>
                    </>
                  )}
                </div>

                {imagePreview && (
                  <div className="relative inline-block">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product preview"
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 p-0"
                      onClick={removeImage}
                      disabled={uploadingImage}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}

                {formData.image_url && (
                  <div className="text-sm text-gray-600">
                    <strong>URL ảnh:</strong> {formData.image_url}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Giá & Tồn kho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="price">Giá bán (VNĐ) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="120000"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="stock">Số lượng tồn kho *</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    placeholder="100"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Đơn vị tính *</Label>
                  <Select value={formData.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilogram (kg)</SelectItem>
                      <SelectItem value="cai">Cái</SelectItem>
                      <SelectItem value="m">Mét (m)</SelectItem>
                      <SelectItem value="m2">Mét vuông (m²)</SelectItem>
                      <SelectItem value="bo">Bộ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trạng thái</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Label htmlFor="isActive">Kích hoạt sản phẩm</Label>
                  <Switch
                    id="isActive"
                    checked={formData.status === "active"}
                    onCheckedChange={(checked) => handleInputChange("status", checked ? "active" : "inactive")}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Hủy
          </Button>
          <Button type="submit" disabled={loading || uploadingImage}>
            {loading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            {uploadingImage ? "Đang tải ảnh..." : "Lưu sản phẩm"}
          </Button>
        </div>
      </form>
    </div>
  )
}
