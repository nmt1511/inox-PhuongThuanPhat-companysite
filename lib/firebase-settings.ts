import { database } from "./firebase"
import { ref, get, set } from "firebase/database"
import { FirebaseDB } from "./firebase-db"

// Settings interfaces
export interface CompanySettings {
  name: string
  description: string
  address: string
  phone: string
  hotline: string
  email: string
  website: string
  taxCode: string
  businessLicense: string
  logo: string
  favicon: string
}

export interface SeoSettings {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  googleAnalytics: string
  facebookPixel: string
  googleTagManager: string
}

export interface EmailSettings {
  smtpHost: string
  smtpPort: string
  smtpUser: string
  smtpPassword: string
  fromName: string
  fromEmail: string
  enableSSL: boolean
}

export interface NotificationSettings {
  newOrder: boolean
  newContact: boolean
  newAgent: boolean
  lowStock: boolean
  systemUpdate: boolean
  emailNotifications: boolean
  smsNotifications: boolean
}

export interface SystemSettings {
  siteName: string
  timezone: string
  language: string
  currency: string
  dateFormat: string
  maintenanceMode: boolean
  allowRegistration: boolean
  requireEmailVerification: boolean
}

export interface AllSettings {
  company: CompanySettings
  seo: SeoSettings
  email: EmailSettings
  notifications: NotificationSettings
  system: SystemSettings
}

export class FirebaseSettings {
  // Get all settings
  static async getAllSettings(): Promise<AllSettings | null> {
    const settingsRef = ref(database, "settings")
    const snapshot = await get(settingsRef)
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null
  }

  // Get specific settings section
  static async getSettings<T extends keyof AllSettings>(section: T): Promise<AllSettings[T] | null> {
    const settingsRef = ref(database, `settings/${section}`)
    const snapshot = await get(settingsRef)
    if (snapshot.exists()) {
      return snapshot.val()
    }
    return null
  }

  // Save specific settings section
  static async saveSettings<T extends keyof AllSettings>(
    section: T,
    settings: AllSettings[T],
    userId?: string,
  ): Promise<void> {
    const settingsRef = ref(database, `settings/${section}`)
    await set(settingsRef, {
      ...settings,
      updated_at: new Date().toISOString(),
    })

    if (userId) {
      const sectionNames = {
        company: "Thông tin công ty",
        seo: "Cài đặt SEO",
        email: "Cài đặt Email",
        notifications: "Cài đặt thông báo",
        system: "Cài đặt hệ thống",
      }

      await FirebaseDB.logActivity(
        "settings.update",
        "System",
        "Information",
        `Cập nhật ${sectionNames[section]}`,
        userId,
      )
    }
  }

  // Initialize default settings if they don't exist
  static async initializeDefaultSettings(): Promise<void> {
    const existingSettings = await this.getAllSettings()
    if (!existingSettings) {
      const defaultSettings: AllSettings = {
        company: {
          name: "Công ty TNHH Inox Phương Thuận Phát",
          description: "Chuyên cung cấp và gia công inox chất lượng cao",
          address: "123 Đường ABC, Quận 1, TP.HCM",
          phone: "028.1234.5678",
          hotline: "0901.234.567",
          email: "info@inoxphuongthuanphat.com",
          website: "https://www.inoxphuongthuanphat.com",
          taxCode: "0123456789",
          businessLicense: "0123456789-001",
          logo: "",
          favicon: "",
        },
        seo: {
          metaTitle: "Inox Phương Thuận Phát - Chuyên cung cấp inox chất lượng cao",
          metaDescription:
            "Công ty TNHH Inox Phương Thuận Phát chuyên cung cấp và gia công inox 304, 316L với giá cả cạnh tranh",
          metaKeywords: "inox, tấm inox, ống inox, gia công inox, inox 304, inox 316L",
          googleAnalytics: "",
          facebookPixel: "",
          googleTagManager: "",
        },
        email: {
          smtpHost: "smtp.gmail.com",
          smtpPort: "587",
          smtpUser: "noreply@inoxphuongthuanphat.com",
          smtpPassword: "",
          fromName: "Inox Phương Thuận Phát",
          fromEmail: "noreply@inoxphuongthuanphat.com",
          enableSSL: true,
        },
        notifications: {
          newOrder: true,
          newContact: true,
          newAgent: true,
          lowStock: true,
          systemUpdate: false,
          emailNotifications: true,
          smsNotifications: false,
        },
        system: {
          siteName: "Inox Phương Thuận Phát Admin",
          timezone: "Asia/Ho_Chi_Minh",
          language: "vi",
          currency: "VND",
          dateFormat: "dd/mm/yyyy",
          maintenanceMode: false,
          allowRegistration: false,
          requireEmailVerification: true,
        },
      }

      const settingsRef = ref(database, "settings")
      await set(settingsRef, {
        ...defaultSettings,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
    }
  }
}
