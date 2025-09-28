"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Package,
  Newspaper,
  MessageSquare,
  UserPlus,
  Activity,
  Calendar,
  TrendingUp,
  Eye,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
} from "lucide-react"
import {
  FirebaseDB,
  type Product,
  type NewsArticle,
  type Contact,
  type Agent,
  type ActivityLog,
} from "@/lib/firebase-db"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface DashboardStats {
  products: Product[]
  news: NewsArticle[]
  contacts: Contact[]
  agents: Agent[]
  logs: ActivityLog[]
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: [],
    news: [],
    contacts: [],
    agents: [],
    logs: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [products, news, contacts, agents] = await Promise.all([
          FirebaseDB.getProducts(),
          FirebaseDB.getNews(),
          FirebaseDB.getContacts(),
          FirebaseDB.getAgents(),
        ])

        setStats({
          products,
          news,
          contacts,
          agents,
          logs: [], // Will be loaded via real-time listener
        })
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()

    // Set up real-time listener for activity logs
    const unsubscribe = FirebaseDB.onActivityLogsChange((logs) => {
      setStats((prev) => ({ ...prev, logs }))
    })

    return unsubscribe
  }, [])

  // Calculate statistics
  const totalProducts = stats.products.length
  const activeProducts = stats.products.filter((p) => p.status === "active").length
  const outOfStockProducts = stats.products.filter((p) => p.stock === 0).length

  const totalNews = stats.news.length
  const publishedNews = stats.news.filter((n) => n.status === "published").length
  const totalViews = stats.news.reduce((sum, n) => sum + (n.view_count || 0), 0)

  const totalContacts = stats.contacts.length
  const unreadContacts = stats.contacts.filter((c) => c.status === "new").length
  const urgentContacts = stats.contacts.filter((c) => c.priority === "high").length

  const totalAgents = stats.agents.length
  const approvedAgents = stats.agents.filter((a) => a.status === "approved").length

  const recentLogs = stats.logs.slice(0, 10)
  const errorLogs = stats.logs.filter((l) => l.level === "Error").length
  const successLogs = stats.logs.filter((l) => l.level === "Success").length

  // Chart data
  const productCategoryData = stats.products.reduce(
    (acc, product) => {
      const category = product.category || "Khác"
      acc[category] = (acc[category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const pieChartData = Object.entries(productCategoryData).map(([name, value]) => ({
    name,
    value,
  }))

  const contactStatusData = [
    { name: "Mới", value: stats.contacts.filter((c) => c.status === "new").length },
    { name: "Đang xử lý", value: stats.contacts.filter((c) => c.status === "in_progress").length },
    { name: "Đã hoàn thành", value: stats.contacts.filter((c) => c.status === "completed").length },
    { name: "Đã hủy", value: stats.contacts.filter((c) => c.status === "cancelled").length },
  ]

  const activityData = stats.logs
    .slice(0, 7)
    .reverse()
    .map((log, index) => ({
      name: `${index + 1}`,
      date: new Date(log.created_at).toLocaleDateString("vi-VN"),
      activities: 1,
      errors: log.level === "Error" ? 1 : 0,
      success: log.level === "Success" ? 1 : 0,
    }))

  const monthlyNewsData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthNews = stats.news.filter((n) => {
      const newsDate = new Date(n.created_at)
      return newsDate.getMonth() === date.getMonth() && newsDate.getFullYear() === date.getFullYear()
    })
    return {
      month: date.toLocaleDateString("vi-VN", { month: "short" }),
      articles: monthNews.length,
      views: monthNews.reduce((sum, n) => sum + (n.view_count || 0), 0),
    }
  }).reverse()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hệ thống quản lý website</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString("vi-VN")}</span>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng sản phẩm</p>
                <p className="mt-2 text-2xl font-bold">{totalProducts}</p>
                <p className="text-xs text-green-600">{activeProducts} đang hoạt động</p>
              </div>
              <div className="bg-blue-500 p-2 rounded-full">
                <Package className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tin tức & Dự án</p>
                <p className="mt-2 text-2xl font-bold">{totalNews}</p>
                <p className="text-xs text-green-600">{publishedNews} đã xuất bản</p>
              </div>
              <div className="bg-green-500 p-2 rounded-full">
                <Newspaper className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Liên hệ</p>
                <p className="mt-2 text-2xl font-bold">{totalContacts}</p>
                <p className="text-xs text-yellow-600">{unreadContacts} chưa đọc</p>
              </div>
              <div className="bg-yellow-500 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Đại lý</p>
                <p className="mt-2 text-2xl font-bold">{totalAgents}</p>
                <p className="text-xs text-purple-600">{approvedAgents} đã duyệt</p>
              </div>
              <div className="bg-purple-500 p-2 rounded-full">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng lượt xem</p>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hết hàng</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockProducts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Liên hệ khẩn cấp</p>
                <p className="text-2xl font-bold text-orange-600">{urgentContacts}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Hoạt động hôm nay</p>
                <p className="text-2xl font-bold">{recentLogs.length}</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Categories Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Phân bố sản phẩm theo danh mục
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contact Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Trạng thái liên hệ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contactStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly News Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Xu hướng bài viết 6 tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyNewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="articles" stroke="#8884d8" name="Bài viết" />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" name="Lượt xem" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Hoạt động hệ thống
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="success" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Thành công" />
                <Area type="monotone" dataKey="errors" stackId="1" stroke="#ff7c7c" fill="#ff7c7c" name="Lỗi" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Hoạt động gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Chưa có hoạt động nào</p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {log.level === "Success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : log.level === "Error" ? (
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    ) : (
                      <Activity className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium">{log.action}</p>
                      <p className="text-sm text-gray-500">{log.details}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={log.level === "Error" ? "destructive" : "secondary"}>{log.level}</Badge>
                    <p className="text-xs text-gray-500 mt-1">{new Date(log.created_at).toLocaleString("vi-VN")}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Thao tác nhanh</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Package className="h-6 w-6 mb-2" />
              Thêm sản phẩm
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Newspaper className="h-6 w-6 mb-2" />
              Viết bài mới
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <MessageSquare className="h-6 w-6 mb-2" />
              Xem liên hệ
            </Button>
            <Button variant="outline" className="h-20 flex-col bg-transparent">
              <Users className="h-6 w-6 mb-2" />
              Quản lý đại lý
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
