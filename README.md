# 🏭 Inox Phương Thuận Phát - Company Website

Website công ty chuyên về inox và kim loại, được xây dựng với Next.js 14, TypeScript, và Firebase.

## 🚀 Tính năng chính

### 📱 Website công cộng
- **Trang chủ**: Giới thiệu công ty và sản phẩm
- **Sản phẩm**: Catalog đầy đủ các sản phẩm inox
- **Tin tức**: Tin tức công ty và ngành
- **Giới thiệu**: Thông tin về công ty
- **Liên hệ**: Form liên hệ và thông tin
- **Đăng ký đại lý**: Form đăng ký làm đại lý

### 🔧 Admin Dashboard
- **Quản lý sản phẩm**: CRUD sản phẩm với hình ảnh
- **Quản lý tin tức**: Đăng bài, chỉnh sửa tin tức
- **Quản lý danh mục**: Phân loại sản phẩm
- **Quản lý người dùng**: User management
- **Quản lý liên hệ**: Xem và xử lý form liên hệ
- **Quản lý slider**: Banner trang chủ
- **Cài đặt**: Cấu hình website
- **Activity logs**: Theo dõi hoạt động

### 🤖 AI Features
- **Chat AI**: Hỗ trợ khách hàng tự động với Gemini AI
- **Chat prompts**: Quản lý các prompt cho AI
- **AI agents**: Cấu hình AI agents

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend**: Firebase (Auth + Realtime Database + Storage)
- **AI**: Google Gemini AI
- **Image Upload**: Cloudinary
- **State Management**: React Context + SWR
- **Form**: React Hook Form + Zod validation
- **UI Components**: Radix UI + shadcn/ui

## 🔐 Cấu hình Bảo mật

### 1. Thiết lập biến môi trường

Sao chép file template:
```bash
cp .env.example .env.local
```

### 2. Cấu hình Firebase

Thêm vào `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Cấu hình Cloudinary

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Cấu hình Gemini AI

```env
GEMINI_API_KEY=your_gemini_api_key
```

### ⚠️ Quy tắc bảo mật

- ✅ **NEXT_PUBLIC_**: Client-side, an toàn để expose
- ❌ **Không NEXT_PUBLIC_**: Server-side only, KHÔNG BAO GIỜ expose
- 🔐 **API secrets**: Luôn giữ private, không commit vào Git
- 🚫 **Không hard-code**: Tuyệt đối không hard-code credentials trong code

## 📦 Cài đặt & Chạy

### Yêu cầu hệ thống
- Node.js 18+ 
- pnpm (khuyên dùng)

### Cài đặt
```bash
# Clone dự án
git clone https://github.com/nmt1511/inox-PhuongThuanPhat-companysite.git
cd inox-PhuongThuanPhat-companysite

# Cài dependencies
pnpm install

# Thiết lập environment
cp .env.example .env.local
# Điền thông tin thực vào .env.local

# Chạy development
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem website.

### Build production
```bash
pnpm build
pnpm start
```

## 🏗️ Cấu trúc dự án

```
├── app/                    # Next.js 14 App Router
│   ├── (routes)/          # Route groups
│   ├── admin/            # Admin dashboard pages
│   ├── chat/             # AI Chat page
│   ├── san-pham/         # Products page
│   ├── tin-tuc/          # News page
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui base components
│   └── shared/           # Custom shared components
├── lib/                   # Utilities & services
│   ├── firebase.ts       # Firebase configuration
│   ├── cloudinary.ts     # Image upload service
│   ├── gemini-ai.ts      # AI service
│   └── ...
├── hooks/                 # Custom React hooks
├── data/                  # Static data & types
├── styles/                # Global styles
└── public/                # Static assets
```

## 🔑 Admin Access

Truy cập admin tại: `/admin/login`

Đăng nhập bằng tài khoản Firebase được cấp quyền admin.

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablet friendly
- ✅ Desktop optimized
- ✅ Dark mode support

## 🧪 Code Quality

### Linting
```bash
pnpm lint
```

### Type Checking  
```bash
pnpm build  # TypeScript sẽ được check tự động
```

### Best Practices
- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Functional components với React.FC
- ✅ Proper error handling
- ✅ Input validation với Zod
- ✅ API service layer pattern

## 🚀 Deploy

### Vercel (Khuyên dùng)
```bash
# Tự động deploy khi push lên main branch
git push origin main
```

### Manual Deploy
```bash
pnpm build
# Upload folder .next và các file cần thiết lên server
```

### Environment Variables trên Production
Đảm bảo set đúng các env vars trên Vercel/hosting platform:
- Tất cả các NEXT_PUBLIC_* variables
- Server-side secrets (GEMINI_API_KEY, CLOUDINARY_API_SECRET)

## 🤝 Contributing

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit thay đổi (`git commit -m 'feat: add amazing feature'`)
4. Push lên branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

### Commit Convention
- `feat: tính năng mới`
- `fix: sửa lỗi`
- `docs: cập nhật tài liệu`
- `style: format code`
- `refactor: tái cấu trúc`
- `test: thêm test`

## 📞 Liên hệ

- **Company**: Inox Phương Thuận Phát
- **Developer**: [nmt1511](https://github.com/nmt1511)
- **Repository**: [inox-PhuongThuanPhat-companysite](https://github.com/nmt1511/inox-PhuongThuanPhat-companysite)

## 📄 License

Bản quyền thuộc về Công ty Inox Phương Thuận Phát.

---

⚡ **Lưu ý quan trọng**: Đảm bảo cấu hình đúng `.env.local` trước khi chạy dự án. Không bao giờ commit file chứa API keys thực!