"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, ArrowRight, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { FirebaseDB, type Product, type Category } from "@/lib/firebase-db"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([FirebaseDB.getProducts(), FirebaseDB.getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory
    return matchesSearch && matchesCategory && product.status === "active"
  })

  const productCategories = categories
    .map((category) => ({
      title: category.name,
      description:
        category.description || `Sản phẩm ${category.name} chất lượng cao với đa dạng kích thước và ứng dụng`,
      products: filteredProducts.filter((product) => product.category === category.name).slice(0, 4),
    }))
    .filter((category) => category.products.length > 0)

  const handlePhoneCall = () => {
    window.location.href = "tel:0909189008"
  }

  const handleConsultation = () => {
    window.location.href = "/lien-he"
  }

  const handleQuoteRequest = () => {
    window.location.href = "/lien-he"
  }

  const services = [
    {
      title: "Cắt laser",
      description: "Công nghệ cắt laser hiện đại, độ chính xác cao và bề mặt hoàn thiện tuyệt vời",
      features: ["Độ chính xác ±0.1mm", "Cắt được độ dày 0.5-25mm", "Tốc độ cắt nhanh", "Bề mặt cắt nhẵn"],
      icon: "⚡",
    },
    {
      title: "Cắt plasma",
      description: "Giải pháp cắt plasma hiệu quả cho tấm dày, tối ưu chi phí sản xuất",
      features: ["Cắt được độ dày 3-100mm", "Tốc độ cắt cao", "Chi phí hợp lý", "Phù hợp sản xuất hàng loạt"],
      icon: "🔥",
    },
    {
      title: "Chấn uốn",
      description: "Dịch vụ gia công chấn uốn chính xác theo bản vẽ kỹ thuật",
      features: ["Chấn chính xác theo bản vẽ", "Góc chấn đa dạng", "Bề mặt không bị xước", "Gia công theo yêu cầu"],
      icon: "🔧",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px] pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải sản phẩm...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display text-balance mb-8 fade-in">
              Sản phẩm &<span className="block text-primary">dịch vụ</span>
            </h1>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto mb-12 fade-in">
              Khám phá bộ sưu tập sản phẩm inox chất lượng cao và dịch vụ gia công chuyên nghiệp của chúng tôi
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Tất cả">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {productCategories.length === 0 ? (
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted-foreground">Không tìm thấy sản phẩm nào phù hợp với tiêu chí tìm kiếm.</p>
          </div>
        </section>
      ) : (
        productCategories.map((category, categoryIndex) => (
          <section key={categoryIndex} className={`py-24 ${categoryIndex % 2 === 0 ? "" : "bg-muted/30"}`}>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-light text-balance mb-4">{category.title}</h2>
                <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.products.map((product, productIndex) => (
                  <Card key={productIndex} className="elegant-hover border-0 shadow-lg bg-card group">
                    <CardContent className="p-0">
                      <div className="aspect-square overflow-hidden rounded-t-lg relative">
                        <img
                          src={product.image_url || `/placeholder.svg?height=300&width=300&query=${product.name}`}
                          alt={product.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant={product.isFeatured ? "default" : "secondary"}
                            className={`${
                              product.isFeatured
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            } font-light`}
                          >
                            {product.isFeatured ? "Nổi bật" : "Tiêu chuẩn"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-light mb-2">{product.name}</h3>
                        <p className="text-muted-foreground font-light text-sm mb-2">
                          {product.specifications || `${product.price.toLocaleString("vi-VN")} VNĐ/${product.unit}`}
                        </p>
                        <p className="text-muted-foreground font-light text-xs mb-4">
                          Tồn kho: {product.stock} {product.unit}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            className="p-0 h-auto font-light text-primary"
                            onClick={handleConsultation}
                          >
                            Chi tiết →
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))
      )}

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Dịch vụ gia công</h2>
            <p className="text-elegant opacity-90 max-w-2xl mx-auto">
              Dịch vụ gia công chuyên nghiệp với công nghệ hiện đại và đội ngũ kỹ thuật giàu kinh nghiệm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="elegant-hover border-0 shadow-lg bg-card">
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-xl font-light mb-4 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">{service.description}</p>
                  <div className="space-y-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-light text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Thông số kỹ thuật</h2>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
              Thông tin chi tiết về các loại inox chúng tôi cung cấp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "INOX 304",
                specs: {
                  "Thành phần": "18% Cr, 8% Ni",
                  "Độ bền": "Cao",
                  "Chống ăn mòn": "Tốt",
                  "Ứng dụng": "Dân dụng, thực phẩm",
                  "Từ tính": "Không từ tính",
                  Hàn: "Dễ hàn",
                },
              },
              {
                title: "INOX 316",
                specs: {
                  "Thành phần": "18% Cr, 10% Ni, 2% Mo",
                  "Độ bền": "Rất cao",
                  "Chống ăn mòn": "Xuất sắc",
                  "Ứng dụng": "Y tế, hóa chất",
                  "Từ tính": "Không từ tính",
                  Hàn: "Dễ hàn",
                },
              },
              {
                title: "INOX 201",
                specs: {
                  "Thành phần": "17% Cr, 4% Ni, Mn",
                  "Độ bền": "Trung bình",
                  "Chống ăn mòn": "Khá",
                  "Ứng dụng": "Trang trí, nội thất",
                  "Từ tính": "Yếu từ tính",
                  Hàn: "Khó hàn hơn",
                },
              },
              {
                title: "INOX 430",
                specs: {
                  "Thành phần": "17% Cr",
                  "Độ bền": "Trung bình",
                  "Chống ăn mòn": "Khá",
                  "Ứng dụng": "Đồ gia dụng",
                  "Từ tính": "Có từ tính",
                  Hàn: "Dễ hàn",
                },
              },
            ].map((steel, index) => (
              <Card key={index} className="elegant-hover border-0 shadow-lg bg-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-light mb-6">{steel.title}</h3>
                  <div className="space-y-4">
                    {Object.entries(steel.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-2 border-b border-border/50">
                        <span className="font-light text-muted-foreground">{key}:</span>
                        <span className="font-light">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-hero text-balance mb-8">Cần tư vấn sản phẩm?</h2>
            <p className="text-elegant text-muted-foreground mb-12">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và đưa ra giải pháp tối ưu cho dự án của bạn
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="px-8 py-4 text-base font-light" onClick={handlePhoneCall}>
                <Phone className="mr-2 w-4 h-4" />
                Hotline: 0909 189 008
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-base font-light bg-transparent"
                onClick={handleQuoteRequest}
              >
                Gửi yêu cầu báo giá
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-light mb-6">Phương Thuận Phát</h3>
              <p className="font-light leading-relaxed mb-8 opacity-90">
                Chuyên cung cấp và gia công vật tư inox chất lượng cao, phục vụ các dự án từ dân dụng đến công nghiệp
                với uy tín và chất lượng hàng đầu.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 opacity-70" />
                  <span className="font-light">0909 189 008</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 opacity-70" />
                  <span className="font-light">thuanphat333@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 opacity-70 mt-1" />
                  <span className="font-light">
                    1038 Huỳnh Văn Lũy, P.8, P.Phú Mỹ
                    <br />
                    TP Thủ Dầu Một, Bình Dương
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-6">Sản phẩm</h4>
              <ul className="space-y-3 font-light opacity-90">
                <li>
                  <a href="/san-pham" className="hover:opacity-100 transition-opacity">
                    Tấm inox
                  </a>
                </li>
                <li>
                  <a href="/san-pham" className="hover:opacity-100 transition-opacity">
                    Ống inox
                  </a>
                </li>
                <li>
                  <a href="/san-pham" className="hover:opacity-100 transition-opacity">
                    Phụ kiện inox
                  </a>
                </li>
                <li>
                  <a href="/san-pham" className="hover:opacity-100 transition-opacity">
                    Dịch vụ gia công
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-6">Công ty</h4>
              <ul className="space-y-3 font-light opacity-90">
                <li>
                  <a href="/gioi-thieu" className="hover:opacity-100 transition-opacity">
                    Giới thiệu
                  </a>
                </li>
                <li>
                  <a href="/tin-tuc" className="hover:opacity-100 transition-opacity">
                    Tin tức
                  </a>
                </li>
                <li>
                  <a href="/dang-ky-dai-ly" className="hover:opacity-100 transition-opacity">
                    Đăng ký đại lý
                  </a>
                </li>
                <li>
                  <a href="/lien-he" className="hover:opacity-100 transition-opacity">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="font-light opacity-70">© 2025 Công ty TNHH Phương Thuận Phát. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
