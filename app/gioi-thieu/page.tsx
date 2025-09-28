"use client"

import { Phone, Mail, MapPin, ArrowRight, CheckCircle, Award, Users, Clock, Target, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"

export default function AboutPage() {
  const handlePhoneCall = () => {
    window.location.href = "tel:0909189008"
  }

  const handleConsultation = () => {
    window.location.href = "/lien-he"
  }

  const handleLearnMore = () => {
    window.location.href = "/san-pham"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-display text-balance mb-8 fade-in">Về chúng tôi</h1>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto fade-in">
              Phương Thuận Phát - Đơn vị tiên phong trong lĩnh vực cung cấp và gia công vật tư inox chất lượng cao tại
              Việt Nam
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="/industrial-steel-processing-equipment.jpg"
                  alt="Nhà máy gia công inox"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-hero text-balance mb-8">
                Hành trình xây dựng
                <span className="block text-primary">niềm tin</span>
              </h2>
              <div className="space-y-6 text-elegant text-muted-foreground">
                <p>
                  Được thành lập với tầm nhìn trở thành đối tác tin cậy hàng đầu trong ngành inox, Phương Thuận Phát đã
                  không ngừng phát triển và khẳng định vị thế trong suốt hơn một thập kỷ qua.
                </p>
                <p>
                  Chúng tôi hiểu rằng mỗi dự án đều mang trong mình những yêu cầu riêng biệt. Vì vậy, đội ngũ chuyên gia
                  của chúng tôi luôn sẵn sàng lắng nghe, tư vấn và đưa ra những giải pháp tối ưu nhất.
                </p>
                <p>
                  Với cam kết về chất lượng và sự chuyên nghiệp, chúng tôi đã trở thành lựa chọn tin cậy của hàng nghìn
                  khách hàng trên toàn quốc.
                </p>
              </div>
              <Button className="mt-8 font-light" onClick={handleLearnMore}>
                Tìm hiểu thêm
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Tầm nhìn & Sứ mệnh</h2>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
              Những giá trị cốt lõi định hướng mọi hoạt động của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Card className="elegant-hover border-0 shadow-lg bg-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Tầm nhìn</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Trở thành công ty hàng đầu Việt Nam trong lĩnh vực cung cấp và gia công inox, được khách hàng tin
                  tưởng và đối tác tôn trọng.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Sứ mệnh</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Cung cấp sản phẩm inox chất lượng cao và dịch vụ gia công chuyên nghiệp, góp phần phát triển ngành
                  công nghiệp Việt Nam.
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Giá trị</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Uy tín, chất lượng và sự hài lòng của khách hàng là kim chỉ nam cho mọi quyết định và hành động của
                  chúng tôi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Những giá trị cốt lõi</h2>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
              Bốn trụ cột vững chắc xây dựng nên thành công của Phương Thuận Phát
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="elegant-hover border-0 shadow-lg bg-card text-center group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Uy tín</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Xây dựng niềm tin thông qua sự minh bạch và cam kết thực hiện đúng lời hứa
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card text-center group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Chất lượng</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Không ngừng nâng cao tiêu chuẩn sản phẩm và dịch vụ để vượt trội mong đợi
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card text-center group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Dịch vụ</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Đặt khách hàng làm trung tâm, phục vụ với tâm huyết và sự chuyên nghiệp
                </p>
              </CardContent>
            </Card>

            <Card className="elegant-hover border-0 shadow-lg bg-card text-center group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-light mb-4">Hiệu quả</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Tối ưu hóa quy trình để mang lại giá trị tốt nhất trong thời gian ngắn nhất
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Năng lực & Thế mạnh</h2>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto">
              Những lợi thế cạnh tranh giúp chúng tôi dẫn đầu trong ngành
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-light mb-8">Sản phẩm & Dịch vụ</h3>
              <div className="space-y-4">
                {[
                  "Tấm inox cao cấp: 304, 316, 201, 430 với đa dạng độ dày",
                  "Ống inox tròn, vuông, chữ nhật theo tiêu chuẩn quốc tế",
                  "Phụ kiện inox chuyên dụng: co, tê, cút, mặt bích",
                  "Dịch vụ cắt laser, plasma với độ chính xác cao",
                  "Gia công chấn, uốn theo thiết kế riêng",
                  "Tư vấn kỹ thuật và hỗ trợ thiết kế chuyên nghiệp",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-light mb-8">Ưu điểm cạnh tranh</h3>
              <div className="space-y-4">
                {[
                  "Kho hàng quy mô lớn, luôn sẵn sàng đáp ứng nhu cầu",
                  "Chính sách giá cạnh tranh với nhiều ưu đãi hấp dẫn",
                  "Đội ngũ kỹ thuật viên giàu kinh nghiệm và tận tâm",
                  "Trang thiết bị hiện đại, công nghệ gia công tiên tiến",
                  "Mạng lưới giao hàng rộng khắp toàn quốc",
                  "Hỗ trợ kỹ thuật 24/7, tư vấn chuyên sâu",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground font-light leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-hero text-balance mb-8">Sẵn sàng bắt đầu dự án của bạn?</h2>
            <p className="text-elegant text-muted-foreground mb-12">
              Hãy để chúng tôi đồng hành cùng bạn trong việc hiện thực hóa những ý tưởng sáng tạo với chất lượng inox
              hoàn hảo
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="px-8 py-4 text-base font-light" onClick={handlePhoneCall}>
                <Phone className="mr-2 w-4 h-4" />
                Gọi ngay: 0909 189 008
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-base font-light bg-transparent"
                onClick={handleConsultation}
              >
                Liên hệ tư vấn
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
