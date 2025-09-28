"use client"

import type React from "react"

import { useState } from "react"
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
  Handshake,
  CheckCircle,
  Send,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"

export default function DealerRegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    province: "",
    experience: "",
    expectedSales: "",
    businessDescription: "",
    agreed: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.agreed) {
      alert("Vui lòng đồng ý với các điều khoản và điều kiện")
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log("Dealer registration submitted:", formData)
    alert("Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong vòng 24h để tư vấn chi tiết.")

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      company: "",
      address: "",
      province: "",
      experience: "",
      expectedSales: "",
      businessDescription: "",
      agreed: false,
    })
    setIsSubmitting(false)
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:0909189008"
  }

  const handleEmail = () => {
    window.location.href = "mailto:thuanphat333@gmail.com"
  }

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Hoa hồng hấp dẫn",
      description: "Mức hoa hồng cạnh tranh từ 5-15% tùy theo doanh số bán hàng, được chi trả định kỳ hàng tháng",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Hỗ trợ marketing",
      description: "Cung cấp tài liệu marketing, catalog sản phẩm và hỗ trợ quảng cáo trên các kênh truyền thông",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Đào tạo chuyên nghiệp",
      description: "Đào tạo kiến thức sản phẩm và kỹ năng bán hàng miễn phí với chứng chỉ hoàn thành",
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: "Chính sách ưu đãi",
      description: "Giá đại lý ưu đãi, chính sách thanh toán linh hoạt và hỗ trợ vận chuyển toàn quốc",
    },
  ]

  const requirements = [
    "Có kinh nghiệm trong lĩnh vực vật liệu xây dựng hoặc kim loại",
    "Có mạng lưới khách hàng hoặc kênh phân phối sẵn có",
    "Cam kết doanh số tối thiểu theo thỏa thuận",
    "Có khả năng tài chính và kho bãi phù hợp",
    "Tuân thủ chính sách giá và chất lượng dịch vụ của công ty",
  ]

  const supportLevels = [
    {
      level: "Đại lý cấp 1",
      minSales: "500 triệu/năm",
      commission: "10-15%",
      badge: "Premium",
      benefits: ["Giá tốt nhất", "Hỗ trợ marketing tối đa", "Ưu tiên giao hàng", "Đào tạo chuyên sâu"],
    },
    {
      level: "Đại lý cấp 2",
      minSales: "200 triệu/năm",
      commission: "7-12%",
      badge: "Standard",
      benefits: ["Giá ưu đãi", "Hỗ trợ marketing", "Giao hàng nhanh", "Đào tạo cơ bản"],
    },
    {
      level: "Đại lý cấp 3",
      minSales: "50 triệu/năm",
      commission: "5-10%",
      badge: "Basic",
      benefits: ["Giá đại lý", "Tài liệu sản phẩm", "Hỗ trợ kỹ thuật", "Tư vấn bán hàng"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display text-balance mb-8 fade-in">
              Đăng ký<span className="block text-primary">đại lý</span>
            </h1>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto mb-12 fade-in">
              Trở thành đối tác của chúng tôi và cùng phát triển thị trường inox với những ưu đãi hấp dẫn
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
              <Badge className="bg-primary text-primary-foreground px-6 py-2 text-base font-light">
                <Star className="mr-2 w-4 h-4" />
                Hoa hồng lên đến 15%
              </Badge>
              <Badge variant="outline" className="px-6 py-2 text-base font-light bg-transparent">
                Hỗ trợ toàn diện
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Lợi ích khi trở thành đại lý</h2>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi cam kết mang đến cho đối tác những lợi ích tốt nhất để cùng phát triển bền vững
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="elegant-hover border-0 shadow-lg bg-card text-center">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center text-primary">{benefit.icon}</div>
                  <h3 className="text-xl font-light mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Cấp độ đại lý</h2>
            <p className="text-elegant text-muted-foreground">
              Chương trình đại lý linh hoạt phù hợp với mọi quy mô kinh doanh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportLevels.map((level, index) => (
              <Card
                key={index}
                className={`elegant-hover border-0 shadow-lg bg-card relative overflow-hidden ${
                  index === 0 ? "ring-2 ring-primary" : ""
                }`}
              >
                {index === 0 && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-3 text-sm font-light">
                    KHUYẾN NGHỊ
                  </div>
                )}
                <CardContent className={`p-8 ${index === 0 ? "pt-16" : ""}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-light mb-2">{level.level}</h3>
                    <div className="text-3xl font-light text-primary mb-2">{level.commission}</div>
                    <p className="text-muted-foreground font-light">Hoa hồng</p>
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-light text-muted-foreground">Doanh số tối thiểu</p>
                      <p className="font-light">{level.minSales}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {level.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm font-light">{benefit}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-light text-balance mb-6">Yêu cầu đại lý</h2>
              <p className="text-elegant text-muted-foreground mb-8">
                Để đảm bảo chất lượng dịch vụ và sự phát triển bền vững, chúng tôi có một số yêu cầu cơ bản cho đối tác
              </p>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="font-light">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="/industrial-steel-processing-equipment.jpg?height=500&width=700&query=business partnership handshake"
                alt="Đối tác kinh doanh"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-balance mb-4">Đăng ký ngay</h2>
              <p className="text-elegant text-muted-foreground">
                Điền thông tin dưới đây để chúng tôi liên hệ và tư vấn chi tiết về chương trình đại lý
              </p>
            </div>

            <Card className="elegant-hover border-0 shadow-lg bg-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Họ và tên *</label>
                      <Input
                        placeholder="Nhập họ và tên"
                        className="font-light"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Số điện thoại *</label>
                      <Input
                        placeholder="Nhập số điện thoại"
                        className="font-light"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-muted-foreground mb-3">Email *</label>
                    <Input
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      className="font-light"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-muted-foreground mb-3">Tên công ty/Cửa hàng</label>
                    <Input
                      placeholder="Nhập tên công ty hoặc cửa hàng"
                      className="font-light"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-light text-muted-foreground mb-3">Địa chỉ kinh doanh *</label>
                    <Input
                      placeholder="Nhập địa chỉ kinh doanh"
                      className="font-light"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Tỉnh/Thành phố *</label>
                      <select
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.province}
                        onChange={(e) => handleInputChange("province", e.target.value)}
                        required
                      >
                        <option value="">Chọn tỉnh/thành phố</option>
                        <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                        <option value="ha-noi">Hà Nội</option>
                        <option value="binh-duong">Bình Dương</option>
                        <option value="dong-nai">Đồng Nai</option>
                        <option value="ba-ria-vung-tau">Bà Rịa - Vũng Tàu</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Kinh nghiệm (năm)</label>
                      <select
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                      >
                        <option value="">Chọn kinh nghiệm</option>
                        <option value="0-1">Dưới 1 năm</option>
                        <option value="1-3">1-3 năm</option>
                        <option value="3-5">3-5 năm</option>
                        <option value="5+">Trên 5 năm</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-muted-foreground mb-3">
                      Doanh số dự kiến (triệu VNĐ/năm)
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                      value={formData.expectedSales}
                      onChange={(e) => handleInputChange("expectedSales", e.target.value)}
                    >
                      <option value="">Chọn doanh số dự kiến</option>
                      <option value="50-100">50-100 triệu</option>
                      <option value="100-200">100-200 triệu</option>
                      <option value="200-500">200-500 triệu</option>
                      <option value="500+">Trên 500 triệu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-light text-muted-foreground mb-3">
                      Mô tả về kinh doanh hiện tại
                    </label>
                    <Textarea
                      placeholder="Mô tả về lĩnh vực kinh doanh, khách hàng mục tiêu, kênh phân phối..."
                      rows={4}
                      className="font-light"
                      value={formData.businessDescription}
                      onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      className="mt-1"
                      checked={formData.agreed}
                      onChange={(e) => handleInputChange("agreed", e.target.checked)}
                      required
                    />
                    <label htmlFor="agree" className="text-sm font-light text-muted-foreground">
                      Tôi đồng ý với các điều khoản và điều kiện của chương trình đại lý và cho phép công ty liên hệ với
                      tôi.
                    </label>
                  </div>

                  <Button type="submit" className="w-full py-4 font-light" disabled={isSubmitting}>
                    <Send className="mr-2 w-4 h-4" />
                    {isSubmitting ? "Đang gửi đăng ký..." : "Gửi đăng ký"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-hero text-balance mb-8">Cần hỗ trợ thêm?</h2>
            <p className="text-elegant opacity-90 mb-12">
              Liên hệ trực tiếp với chúng tôi để được tư vấn chi tiết về chương trình đại lý và các ưu đãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="px-8 py-4 text-base font-light bg-background text-foreground hover:bg-background/90"
                onClick={handlePhoneCall}
              >
                <Phone className="mr-2 w-4 h-4" />
                Hotline: 0909 189 008
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-base font-light bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10"
                onClick={handleEmail}
              >
                <Mail className="mr-2 w-4 h-4" />
                Email: thuanphat333@gmail.com
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
