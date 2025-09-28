"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Eye, Newspaper, Calendar, TrendingUp } from "lucide-react"
import { FirebaseDB, type NewsArticle } from "@/lib/firebase-db"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/lib/firebase-auth"
import { usePagination } from "@/hooks/use-pagination"
import { PaginationControls } from "@/components/pagination-controls"

const categories = ["Tất cả", "Thị trường", "Dự án", "Hướng dẫn", "Kỹ thuật", "Tin công ty"]
const statusOptions = ["Tất cả", "Đã xuất bản", "Bản nháp", "Đã lên lịch"]

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")
  const [selectedStatus, setSelectedStatus] = useState("Tất cả")
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await FirebaseDB.getNews()
        setNews(newsData)
      } catch (error) {
        console.error("Error loading news:", error)
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách bài viết",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadNews()

    // Set up real-time listener
    const unsubscribe = FirebaseDB.onNewsChange((newsData) => {
      setNews(newsData)
    })

    return unsubscribe
  }, [toast])

  const filteredNews = news.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      selectedStatus === "Tất cả" ||
      (selectedStatus === "Đã xuất bản" && article.status === "published") ||
      (selectedStatus === "Bản nháp" && article.status === "draft") ||
      (selectedStatus === "Đã lên lịch" && article.status === "scheduled")

    return matchesSearch && matchesStatus
  })

  const pagination = usePagination({
    data: filteredNews,
    itemsPerPage: 10,
  })

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      try {
        await FirebaseDB.deleteNewsArticle(id, user?.uid || "admin")
        toast({
          title: "Thành công",
          description: "Đã xóa bài viết",
        })
      } catch (error) {
        console.error("Error deleting article:", error)
        toast({
          title: "Lỗi",
          description: "Không thể xóa bài viết",
          variant: "destructive",
        })
      }
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Đã xuất bản</Badge>
      case "draft":
        return <Badge variant="secondary">Bản nháp</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-800">Đã lên lịch</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalViews = news.reduce((sum, article) => sum + (article.view_count || 0), 0)
  const publishedCount = news.filter((article) => article.status === "published").length
  const draftCount = news.filter((article) => article.status === "draft").length

  if (loading) {
    return <div className="flex items-center justify-center h-64">Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý tin tức & dự án</h1>
          <p className="text-gray-600 mt-1">Tạo và quản lý nội dung tin tức, bài viết</p>
        </div>
        <Button asChild>
          <Link href="/admin/news/new">
            <Plus className="h-4 w-4 mr-2" />
            Viết bài mới
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng bài viết</p>
                <p className="text-2xl font-bold">{news.length}</p>
              </div>
              <Newspaper className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đã xuất bản</p>
                <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bản nháp</p>
                <p className="text-2xl font-bold text-yellow-600">{draftCount}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng lượt xem</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài viết ({filteredNews.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bài viết</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Lượt xem</TableHead>
                <TableHead>Ngày xuất bản</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedData.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-start space-x-3">
                      <img
                        src={article.featured_image_url || "/placeholder.svg"}
                        alt={article.title}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 line-clamp-2">{article.title}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</p>
                        <div className="flex items-center space-x-2 mt-2 text-xs text-gray-400">
                          <span>Tạo: {new Date(article.created_at).toLocaleDateString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(article.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-gray-400" />
                      <span>{(article.view_count || 0).toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {article.published_at ? (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>{new Date(article.published_at).toLocaleDateString("vi-VN")}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">Chưa xuất bản</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                        <Link href={`/admin/news/${article.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild className="h-8 px-2">
                        <Link href={`/admin/news/${article.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(article.id!, article.title)}
                        className="h-8 px-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            canGoNext={pagination.canGoNext}
            canGoPrevious={pagination.canGoPrevious}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            totalItems={pagination.totalItems}
          />
        </CardContent>
      </Card>
    </div>
  )
}
