"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, Building, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Header from "@/components/header"
import { FirebaseDB } from "@/lib/firebase-db"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await FirebaseDB.addContact({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        customer_company: formData.company,
        subject: formData.subject || "Liên hệ từ website",
        message: formData.message,
        status: "new",
        priority: "medium",
        source: "website",
      })

      toast.success("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.")

      // Reset form
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      toast.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePhoneCall = () => {
    window.location.href = "tel:0909189008"
  }

  const handleEmail = () => {
    window.location.href = "mailto:thuanphat333@gmail.com"
  }

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Điện thoại",
      details: ["Hotline: 0909 189 008", "Văn phòng: (0274) 123 4567"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["thuanphat333@gmail.com", "info@inoxphuongthuanphat.com"],
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Địa chỉ",
      details: ["1038 Huỳnh Văn Lũy - P.8 - P.Phú Mỹ", "TP Thủ Dầu Một - Bình Dương"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Giờ làm việc",
      details: ["Thứ 2 - Thứ 6: 7:00 - 17:00", "Thứ 7: 7:00 - 12:00"],
    },
  ]

  const departments = [
    {
      name: "Phòng Kinh Doanh",
      phone: "0909 189 008",
      email: "kinhdoanh@inoxphuongthuanphat.com",
      description: "Tư vấn sản phẩm, báo giá, đặt hàng",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      name: "Phòng Kỹ Thuật",
      phone: "0909 189 009",
      email: "kythuat@inoxphuongthuanphat.com",
      description: "Hỗ trợ kỹ thuật, thiết kế, gia công",
      icon: <Building className="w-6 h-6" />,
    },
    {
      name: "Phòng Hành Chính",
      phone: "0909 189 010",
      email: "hanhchinh@inoxphuongthuanphat.com",
      description: "Hợp đồng, thanh toán, hóa đơn",
      icon: <User className="w-6 h-6" />,
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
              Liên hệ với<span className="block text-primary">chúng tôi</span>
            </h1>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto fade-in">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn với những giải pháp inox tốt nhất
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="elegant-hover border-0 shadow-lg bg-card text-center">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center text-primary">{info.icon}</div>
                  <h3 className="text-xl font-light mb-4">{info.title}</h3>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground font-light text-sm">
                        {detail}
                      </p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-light text-balance mb-6">Gửi thông tin liên hệ</h2>
              <p className="text-elegant text-muted-foreground mb-12">
                Điền thông tin dưới đây, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
              </p>

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
                      <label className="block text-sm font-light text-muted-foreground mb-3">Email</label>
                      <Input
                        type="email"
                        placeholder="Nhập địa chỉ email"
                        className="font-light"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Công ty/Tổ chức</label>
                      <Input
                        placeholder="Nhập tên công ty hoặc tổ chức"
                        className="font-light"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Chủ đề</label>
                      <select
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                      >
                        <option value="">Chọn chủ đề</option>
                        <option value="Tư vấn sản phẩm">Tư vấn sản phẩm</option>
                        <option value="Yêu cầu báo giá">Yêu cầu báo giá</option>
                        <option value="Hỗ trợ kỹ thuật">Hỗ trợ kỹ thuật</option>
                        <option value="Đăng ký đại lý">Đăng ký đại lý</option>
                        <option value="Khiếu nại">Khiếu nại</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-light text-muted-foreground mb-3">Nội dung *</label>
                      <Textarea
                        placeholder="Nhập nội dung cần tư vấn hoặc hỗ trợ..."
                        rows={5}
                        className="font-light"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full py-4 font-light" disabled={isSubmitting}>
                      <Send className="mr-2 w-4 h-4" />
                      {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl font-light text-balance mb-6">Vị trí của chúng tôi</h2>

              <div className="bg-muted rounded-lg h-64 mb-8 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-4" />
                  <p className="font-light">Bản đồ Google Maps</p>
                  <p className="text-sm font-light">1038 Huỳnh Văn Lũy, P.8, P.Phú Mỹ</p>
                  <p className="text-sm font-light">TP Thủ Dầu Một, Bình Dương</p>
                </div>
              </div>

              <Card className="elegant-hover border-0 shadow-lg bg-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light mb-6">Thông tin chi tiết</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-light mb-1">Địa chỉ chính</p>
                        <p className="text-muted-foreground font-light text-sm">
                          1038 Huỳnh Văn Lũy - P.8 - P.Phú Mỹ
                          <br />
                          TP Thủ Dầu Một - Bình Dương
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-light mb-1">Điện thoại</p>
                        <p className="text-muted-foreground font-light text-sm">0909 189 008</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-light mb-1">Giờ làm việc</p>
                        <p className="text-muted-foreground font-light text-sm">
                          Thứ 2 - Thứ 6: 7:00 - 17:00
                          <br />
                          Thứ 7: 7:00 - 12:00
                          <br />
                          Chủ nhật: Nghỉ
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Các phòng ban</h2>
            <p className="text-elegant text-muted-foreground">
              Liên hệ trực tiếp với phòng ban phù hợp để được hỗ trợ nhanh chóng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => (
              <Card key={index} className="elegant-hover border-0 shadow-lg bg-card text-center">
                <CardContent className="p-8">
                  <div className="mb-6 flex justify-center text-primary">{dept.icon}</div>
                  <h3 className="text-xl font-light mb-3">{dept.name}</h3>
                  <p className="text-muted-foreground font-light text-sm mb-6">{dept.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                      <Phone className="w-4 h-4 text-primary" />
                      <span className="text-sm font-light">{dept.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Mail className="w-4 h-4 text-primary" />
                      <span className="text-sm font-light">{dept.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-hero text-balance mb-8">Liên hệ nhanh</h2>
            <p className="text-elegant opacity-90 mb-12">
              Cần hỗ trợ ngay lập tức? Liên hệ trực tiếp với chúng tôi qua các kênh sau
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="lg"
                className="px-8 py-4 text-base font-light bg-background text-foreground hover:bg-background/90"
                onClick={handlePhoneCall}
              >
                <Phone className="mr-2 w-4 h-4" />
                Gọi ngay: 0909 189 008
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
