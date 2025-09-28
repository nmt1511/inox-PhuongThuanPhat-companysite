"use client"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, ArrowRight, Calendar, Eye, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { FirebaseDB, type NewsArticle } from "@/lib/firebase-db"

export default function NewsPage() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("Tất cả")

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await FirebaseDB.getPublishedNews()
        setNews(newsData)
      } catch (error) {
        console.error("Error loading news:", error)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  const featuredNews = news.length > 0 ? news.sort((a, b) => (b.view_count || 0) - (a.view_count || 0))[0] : null

  const newsArticles = news.filter((article) => article.id !== featuredNews?.id).slice(0, 6)

  const categories = [
    "Tất cả",
    ...Array.from(new Set(news.flatMap((article) => article.tags?.map((tag) => tag.name) || []))),
  ]

  const filteredNews =
    selectedCategory === "Tất cả"
      ? newsArticles
      : newsArticles.filter((article) => article.tags?.some((tag) => tag.name === selectedCategory))

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[400px] pt-32">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải tin tức...</p>
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
              Tin tức &<span className="block text-primary">bài viết</span>
            </h1>
            <p className="text-elegant text-muted-foreground max-w-2xl mx-auto fade-in">
              Cập nhật thông tin mới nhất về ngành inox, xu hướng công nghệ và những kiến thức chuyên môn từ các chuyên
              gia
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className={`font-light ${
                  selectedCategory === category ? "" : "bg-transparent hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <Tag className="mr-2 w-3 h-3" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {featuredNews && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-balance mb-4">Bài viết nổi bật</h2>
              <p className="text-elegant text-muted-foreground">Những thông tin quan trọng và xu hướng mới nhất</p>
            </div>

            <Card className="elegant-hover border-0 shadow-lg bg-card overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <img
                    src={
                      featuredNews.featured_image_url ||
                      `/placeholder.svg?height=500&width=700&query=featured news ${featuredNews.title}`
                    }
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  {featuredNews.tags && featuredNews.tags.length > 0 && (
                    <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground font-light">
                      {featuredNews.tags[0].name}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-12 flex flex-col justify-center">
                  <h3 className="text-2xl font-light mb-6 text-balance leading-tight">{featuredNews.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-8">
                    {featuredNews.excerpt || featuredNews.content.substring(0, 200) + "..."}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-light">
                        {new Date(featuredNews.published_at || featuredNews.created_at).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span className="font-light">{(featuredNews.view_count || 0).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-fit font-light">
                    Đọc tiếp
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </div>
        </section>
      )}

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-balance mb-4">Tin tức mới nhất</h2>
            <p className="text-elegant text-muted-foreground">Cập nhật liên tục những thông tin hữu ích</p>
          </div>

          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Không có bài viết nào trong danh mục này.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((article, index) => (
                <Card key={index} className="elegant-hover border-0 shadow-lg bg-card overflow-hidden group">
                  <div className="relative aspect-[16/10]">
                    <img
                      src={
                        article.featured_image_url ||
                        `/placeholder.svg?height=250&width=400&query=news article ${article.title}`
                      }
                      alt={article.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    {article.tags && article.tags.length > 0 && (
                      <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground font-light">
                        {article.tags[0].name}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-light mb-3 text-balance leading-tight line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt || article.content.substring(0, 150) + "..."}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-light">
                            {new Date(article.published_at || article.created_at).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span className="font-light">{(article.view_count || 0).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-light text-muted-foreground">
                        {article.author_id === "admin" ? "Phương Thuận Phát" : "Tác giả"}
                      </span>
                      <Button variant="ghost" className="p-0 h-auto font-light text-primary">
                        Xem thêm →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Button variant="outline" size="lg" className="px-8 py-4 font-light bg-transparent">
              Xem thêm bài viết
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-balance mb-6">Đăng ký nhận tin tức</h2>
            <p className="text-elegant opacity-90 mb-12">
              Đăng ký để nhận thông tin mới nhất về sản phẩm, xu hướng ngành và những kiến thức chuyên môn từ các chuyên
              gia
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-foreground bg-background border border-border font-light focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <Button className="px-6 py-3 font-light bg-background text-foreground hover:bg-background/90">
                Đăng ký
              </Button>
            </div>
            <p className="text-sm opacity-70 mt-4 font-light">
              Chúng tôi cam kết bảo mật thông tin và không gửi thư rác
            </p>
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
