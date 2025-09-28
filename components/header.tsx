"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        {/* Top bar - hidden on mobile */}
        <div className="py-2 text-sm border-b border-border/30 hidden md:block">
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              CHUYÊN VẬT TƯ INOX VÀ GIA CÔNG CẮT CHẤN CÁC LOẠI TÔN, SẮT, INOX
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">Hotline: 0909189008</span>
            </div>
          </div>
        </div>

        {/* Main navigation */}
        <div className="py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
              <div className="flex items-center gap-3">
                <Image
                  src="https://blogger.googleusercontent.com/img/a/AVvXsEjs4pmLnY24p1FPefALK6p-oAkBBjXHYsriOJGD5A0KIwcb2EkN7AIhldOwiPeXKHRqRvYT7LhIioqKVmB647HCt40CijmKUSYonjVCYVJpZQ-sQO70dIqg6XtbKKUreCTI4m_DOQZckDjxbgh3hFFaprSiG5ks4Yedu18LUoGzfoM_nIuMFdrxkkWbxqHk=s200"
                  alt="Phương Thuận Phát Logo"
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain"
                />
                <div className="hidden sm:block">
                  <div className="font-bold text-lg text-foreground">Phương Thuận Phát</div>
                  <div className="text-xs text-muted-foreground">Vật tư Inox</div>
                </div>
              </div>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex gap-6">
              <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
                TRANG CHỦ
              </Link>
              <Link href="/gioi-thieu" className="text-sm font-medium hover:text-primary transition-colors">
                GIỚI THIỆU
              </Link>
              <Link href="/san-pham" className="text-sm font-medium hover:text-primary transition-colors">
                SẢN PHẨM
              </Link>
              <Link href="/tin-tuc" className="text-sm font-medium hover:text-primary transition-colors">
                TIN TỨC
              </Link>
              <Link href="/lien-he" className="text-sm font-medium hover:text-primary transition-colors">
                LIÊN HỆ
              </Link>
            </nav>

            {/* Desktop hotline button */}
            <Button
              variant="default"
              className="hidden md:flex items-center gap-2"
              onClick={() => window.open("tel:0909189008")}
            >
              <Phone className="w-4 h-4" />
              0909189008
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border/30 bg-background/95 backdrop-blur-md">
            <nav className="py-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                TRANG CHỦ
              </Link>
              <Link
                href="/gioi-thieu"
                className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                GIỚI THIỆU
              </Link>
              <Link
                href="/san-pham"
                className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                SẢN PHẨM
              </Link>
              <Link
                href="/tin-tuc"
                className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                TIN TỨC
              </Link>
              <Link
                href="/lien-he"
                className="block px-4 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                onClick={closeMobileMenu}
              >
                LIÊN HỆ
              </Link>

              {/* Mobile hotline button */}
              <div className="px-4 pt-2">
                <Button
                  variant="default"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => {
                    window.open("tel:0909189008")
                    closeMobileMenu()
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Gọi ngay: 0909189008
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
