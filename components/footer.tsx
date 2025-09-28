import { Facebook, Youtube, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">INOX BÌNH DƯƠNG</h3>
            <p className="text-sm mb-4">
              Chuyên cung cấp vật tư inox và gia công cắt chấn các loại tôn, sắt, inox ứng dụng các loại với chất lượng
              cao và giá cả cạnh tranh.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">CÔNG TY TNHH PHƯƠNG THUẬN PHÁT</h3>
            <div className="space-y-2 text-sm">
              <p>Địa chỉ: 1038 Huỳnh Văn Lũy - P.8 - P.Phú Mỹ</p>
              <p>TP Thủ Dầu Một - Bình Dương</p>
              <p>Hotline: 0909 189 008</p>
              <p>Email: thuanphat333@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Mạng xã hội</h3>
            <div className="flex gap-4">
              <Facebook className="w-8 h-8 p-1 bg-blue-600 rounded hover:bg-blue-700 cursor-pointer" />
              <Youtube className="w-8 h-8 p-1 bg-red-600 rounded hover:bg-red-700 cursor-pointer" />
              <Instagram className="w-8 h-8 p-1 bg-pink-600 rounded hover:bg-pink-700 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-8 text-center text-sm">
          <p>© 2025 Công ty TNHH Phương Thuận Phát. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
