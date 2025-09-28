"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { FirebaseDB, type Slider } from "@/lib/firebase-db"

const defaultSliders: Slider[] = [
  {
    id: "1",
    title: "Chào mừng đến với Inox Phương Thuận Phát",
    description: "Chuyên cung cấp inox chất lượng cao với giá cả cạnh tranh nhất thị trường",
    image: "/modern-stainless-steel-factory-with-industrial-equ.jpg",
    link: "/san-pham",
    buttonText: "Khám phá sản phẩm",
    order: 1,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Dịch vụ gia công inox chuyên nghiệp",
    description: "Cắt laser, uốn, hàn với công nghệ hiện đại và đội ngũ thợ lành nghề",
    image: "/precision-laser-cutting-stainless-steel-with-spark.jpg",
    link: "/dich-vu",
    buttonText: "Tìm hiểu dịch vụ",
    order: 2,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Giải pháp inox toàn diện",
    description: "Từ tư vấn thiết kế đến thi công hoàn thiện, chúng tôi đồng hành cùng dự án của bạn",
    image: "/modern-stainless-steel-architectural-structure-bui.jpg",
    link: "/lien-he",
    buttonText: "Liên hệ tư vấn",
    order: 3,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [sliders, setSliders] = useState<Slider[]>(defaultSliders)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSliders = async () => {
      try {
        const firebaseSliders = await FirebaseDB.getActiveSliders()
        if (firebaseSliders.length > 0) {
          setSliders(firebaseSliders)
        } else {
          // Use default sliders if no Firebase sliders exist
          setSliders(defaultSliders)
        }
      } catch (error) {
        console.error("Error loading sliders:", error)
        // Fallback to default sliders on error
        setSliders(defaultSliders)
      } finally {
        setLoading(false)
      }
    }

    loadSliders()

    const unsubscribe = FirebaseDB.onSlidersChange((slidersData) => {
      const activeSliders = slidersData.filter((slider) => slider.isActive).sort((a, b) => a.order - b.order)
      if (activeSliders.length > 0) {
        setSliders(activeSliders)
      } else {
        setSliders(defaultSliders)
      }
    })

    return unsubscribe
  }, [])

  const activeSliders = sliders.filter((slider) => slider.isActive).sort((a, b) => a.order - b.order)

  useEffect(() => {
    if (!isAutoPlaying || activeSliders.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSliders.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSliders.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume auto-play after 10s
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSliders.length) % activeSliders.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSliders.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const handleSlideClick = (link: string) => {
    if (link) {
      window.location.href = link
    }
  }

  if (loading) {
    return (
      <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden bg-muted/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Đang tải slider...</p>
          </div>
        </div>
      </section>
    )
  }

  if (activeSliders.length === 0) {
    return null
  }

  return (
    <section className="relative w-full h-[500px] md:h-[700px] overflow-hidden">
      <div className="relative w-full h-full">
        {activeSliders.map((slider, index) => (
          <div
            key={slider.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="relative w-full h-full">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slider.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
              </div>

              {/* Content Overlay */}
              <div className="relative z-10 h-full flex items-center">
                <div className="container mx-auto px-4 md:px-6">
                  <div className="max-w-3xl text-white">
                    <h1 className="text-3xl md:text-6xl font-light text-balance mb-4 md:mb-6 leading-tight">
                      {slider.title}
                    </h1>
                    <p className="text-lg md:text-2xl font-light leading-relaxed mb-8 md:mb-10 opacity-95 max-w-2xl">
                      {slider.description}
                    </p>
                    {slider.buttonText && (
                      <Button
                        size="lg"
                        className="px-8 py-4 text-base font-medium bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        onClick={() => handleSlideClick(slider.link)}
                      >
                        {slider.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeSliders.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>
        </>
      )}

      {activeSliders.length > 1 && (
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {activeSliders.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-8 h-3 bg-white" : "w-3 h-3 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {activeSliders.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
          <div
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / activeSliders.length) * 100}%`,
            }}
          />
        </div>
      )}
    </section>
  )
}
