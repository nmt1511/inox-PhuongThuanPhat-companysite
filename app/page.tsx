"use client"

import { Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import HeroSlider from "@/components/hero-slider"
import { ChatWidget } from "@/components/chat-widget"

export default function HomePage() {
  const handlePhoneCall = () => {
    window.location.href = "tel:0909189008"
  }

  const handleConsultation = () => {
    window.location.href = "/lien-he"
  }

  const handleExploreProducts = () => {
    window.location.href = "/san-pham"
  }

  const handleLearnMore = () => {
    window.location.href = "/gioi-thieu"
  }

  const handleStartConsultation = () => {
    window.location.href = "/lien-he"
  }

  const handleViewDetails = (category: string) => {
    window.location.href = `/san-pham?category=${category}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <HeroSlider />

      <section className="py-16 md:py-24 bg-muted/30 mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-balance mb-4">Giá trị cốt lõi</h2>
            <p className="text-base md:text-elegant text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi xây dựng niềm tin thông qua chất lượng và dịch vụ xuất sắc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-light text-primary">1</span>
              </div>
              <h3 className="text-xl font-light mb-4">Chất lượng vượt trội</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Cam kết cung cấp sản phẩm inox đạt tiêu chuẩn quốc tế với độ bền cao và tính thẩm mỹ hoàn hảo.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-light text-primary">2</span>
              </div>
              <h3 className="text-xl font-light mb-4">Dịch vụ chuyên nghiệp</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Đội ngũ kỹ thuật giàu kinh nghiệm, tư vấn chuyên sâu và hỗ trợ khách hàng 24/7.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-light text-primary">3</span>
              </div>
              <h3 className="text-xl font-light mb-4">Giá trị bền vững</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Xây dựng mối quan hệ lâu dài với khách hàng thông qua uy tín và chất lượng dịch vụ.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-hero text-balance mb-6 md:mb-8">Kết hợp đổi mới, độ bền và hiệu quả</h2>
            <p className="text-base md:text-elegant text-muted-foreground max-w-3xl mx-auto">
              Phương Thuận Phát đang dẫn đầu trong việc chuyển đổi ngành công nghiệp inox. Chúng tôi đề xuất các giải
              pháp bền vững cho các doanh nghiệp trong lĩnh vực này.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 md:mb-12">
              <img
                src="/industrial-steel-processing-equipment.jpg"
                alt="Steel processing facility"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center">
              <p className="text-muted-foreground font-light max-w-2xl mx-auto mb-6 md:mb-8">
                Phương Thuận Phát muốn trở thành động lực của sự chuyển đổi trong lĩnh vực sản phẩm inox. Chúng tôi đề
                xuất các giải pháp bền vững cho dịch vụ của các doanh nghiệp trong lĩnh vực.
              </p>
              <Button variant="outline" className="font-light bg-transparent" onClick={handleLearnMore}>
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-balance mb-4">
              Một cách tiếp cận toàn diện
              <span className="block">cho mô hình tương lai</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="elegant-hover border-0 shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="/stainless-steel-sheet-.jpg"
                    alt="Stainless steel sheets"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-4">Tấm inox chất lượng cao</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    Cung cấp đa dạng các loại tấm inox với độ dày và kích thước khác nhau, đáp ứng mọi nhu cầu từ trang
                    trí đến công nghiệp.
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-light"
                    onClick={() => handleViewDetails("tam-inox")}
                  >
                    Xem chi tiết →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="/stainless-steel-pipe-.jpg"
                    alt="Stainless steel pipes"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-4">Ống inox đa dạng</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    Ống inox tròn, vuông, chữ nhật với nhiều kích cỡ khác nhau, phù hợp cho các ứng dụng xây dựng và
                    trang trí.
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-light"
                    onClick={() => handleViewDetails("ong-inox")}
                  >
                    Xem chi tiết →
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src="/stainless-steel-cutting-machine.jpg"
                    alt="Steel processing services"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-light mb-4">Dịch vụ gia công</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6">
                    Cắt laser, cắt plasma, chấn, uốn theo yêu cầu với độ chính xác cao và thời gian giao hàng nhanh
                    chóng.
                  </p>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-light"
                    onClick={() => handleViewDetails("gia-cong")}
                  >
                    Xem chi tiết →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-hero text-balance mb-6 md:mb-8">Hãy nói về dự án của bạn</h2>
            <p className="text-base md:text-elegant text-muted-foreground mb-8 md:mb-12">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và hỗ trợ bạn tìm ra giải pháp inox tối ưu cho dự án của
              mình.
            </p>
            <Button size="lg" className="px-8 md:px-12 py-4 text-base font-light" onClick={handleStartConsultation}>
              Bắt đầu tư vấn
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6">Phương Thuận Phát</h3>
              <p className="font-light leading-relaxed mb-6 md:mb-8 opacity-90 text-sm md:text-base">
                Chuyên cung cấp và gia công vật tư inox chất lượng cao, phục vụ các dự án từ dân dụng đến công nghiệp
                với uy tín và chất lượng hàng đầu.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 opacity-70" />
                  <span className="font-light text-sm md:text-base">0909 189 008</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 opacity-70" />
                  <span className="font-light text-sm md:text-base">thuanphat333@gmail.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 opacity-70 mt-1" />
                  <span className="font-light text-sm md:text-base">
                    1038 Huỳnh Văn Lũy, P.8, P.Phú Mỹ
                    <br />
                    TP Thủ Dầu Một, Bình Dương
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-4 md:mb-6 text-sm md:text-base">Sản phẩm</h4>
              <ul className="space-y-2 md:space-y-3 font-light opacity-90 text-sm md:text-base">
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
              <h4 className="font-medium mb-4 md:mb-6 text-sm md:text-base">Công ty</h4>
              <ul className="space-y-2 md:space-y-3 font-light opacity-90 text-sm md:text-base">
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
                  <a href="/lien-he" className="hover:opacity-100 transition-opacity">
                    Liên hệ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="font-light opacity-70 text-xs md:text-sm">
              © 2025 Công ty TNHH Phương Thuận Phát. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  )
}
