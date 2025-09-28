"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, Activity, User, Database, Shield, AlertTriangle, Info, CheckCircle, Trash2 } from "lucide-react"
import { FirebaseDB, type ActivityLog } from "@/lib/firebase-db"
import { useAuth } from "@/lib/firebase-auth"
import { usePagination } from "@/hooks/use-pagination"
import { PaginationControls } from "@/components/pagination-controls"

const typeOptions = ["Tất cả", "Auth", "Product", "Content", "User", "System"]
const levelOptions = ["Tất cả", "Information", "Success", "Warning", "Error"]

export default function LogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("Tất cả")
  const [selectedLevel, setSelectedLevel] = useState("Tất cả")
  const [logs, setLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = FirebaseDB.onActivityLogsChange((newLogs) => {
      setLogs(newLogs)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.actor_details && log.actor_details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "Tất cả" || log.type === selectedType

    const matchesLevel = selectedLevel === "Tất cả" || log.level === selectedLevel

    return matchesSearch && matchesType && matchesLevel
  })

  const pagination = usePagination({
    data: filteredLogs,
    itemsPerPage: 15,
  })

  const getLevelBadge = (level: ActivityLog["level"]) => {
    switch (level) {
      case "Information":
        return <Badge className="bg-blue-100 text-blue-800">Thông tin</Badge>
      case "Success":
        return <Badge className="bg-green-100 text-green-800">Thành công</Badge>
      case "Warning":
        return <Badge className="bg-yellow-100 text-yellow-800">Cảnh báo</Badge>
      case "Error":
        return <Badge variant="destructive">Lỗi</Badge>
      default:
        return <Badge variant="secondary">{level}</Badge>
    }
  }

  const getTypeIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "Auth":
        return <Shield className="h-4 w-4" />
      case "Product":
      case "Content":
        return <Database className="h-4 w-4" />
      case "User":
        return <User className="h-4 w-4" />
      case "System":
        return <Activity className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getLevelIcon = (level: ActivityLog["level"]) => {
    switch (level) {
      case "Success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "Error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const infoCount = logs.filter((l) => l.level === "Information").length
  const successCount = logs.filter((l) => l.level === "Success").length
  const warningCount = logs.filter((l) => l.level === "Warning").length
  const errorCount = logs.filter((l) => l.level === "Error").length

  const handleDeleteLog = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa log này?")) {
      try {
        await FirebaseDB.deleteActivityLog(id, user?.uid || "admin")
      } catch (error) {
        console.error("Error deleting log:", error)
        setError("Không thể xóa log")
      }
    }
  }

  const getActorDisplay = (log: ActivityLog) => {
    if (log.user_id) {
      return `User ID: ${log.user_id}`
    }
    return log.actor_details || "System"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Đang tải nhật ký hoạt động...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nhật ký hoạt động</h1>
          <p className="text-gray-600 mt-1">Theo dõi các hoạt động và sự kiện trong hệ thống</p>
        </div>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thông tin</p>
                <p className="text-2xl font-bold text-blue-600">{infoCount}</p>
              </div>
              <Info className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thành công</p>
                <p className="text-2xl font-bold text-green-600">{successCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cảnh báo</p>
                <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lỗi</p>
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
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
                  placeholder="Tìm kiếm hoạt động, người dùng..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Loại" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Mức độ" />
              </SelectTrigger>
              <SelectContent>
                {levelOptions.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Nhật ký hoạt động ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hoạt động</TableHead>
                <TableHead>Người thực hiện</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Chi tiết</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Thời gian</TableHead>
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedData.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getLevelIcon(log.level)}
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{getActorDisplay(log)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(log.type)}
                      <span className="text-sm">{log.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getLevelBadge(log.level)}</TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{log.details}</p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{log.ip_address || "N/A"}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-500">{new Date(log.created_at).toLocaleString("vi-VN")}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteLog(log.id!)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {pagination.paginatedData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Không có nhật ký hoạt động nào
                  </TableCell>
                </TableRow>
              )}
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
