"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Newspaper,
  MessageSquare,
  Settings,
  Activity,
  Building2,
  ImageIcon,
} from "lucide-react"

const navigation = [
  { name: "Tổng quan", href: "/admin", icon: LayoutDashboard },
  { name: "Sản phẩm", href: "/admin/products", icon: Package },
  { name: "Danh mục", href: "/admin/categories", icon: FolderOpen },
  { name: "Tin tức", href: "/admin/news", icon: Newspaper },
  { name: "Slider/Banner", href: "/admin/sliders", icon: ImageIcon }, // Enabled slider menu
  { name: "Liên hệ", href: "/admin/contacts", icon: MessageSquare },
  { name: "Cài đặt", href: "/admin/settings", icon: Settings },
  { name: "Nhật ký", href: "/admin/logs", icon: Activity },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 h-full">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Building2 className="h-8 w-8 text-blue-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">Inox Phương Thuận Phát</p>
          </div>
        </div>
      </div>

      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
