import { FirebaseDB, type ActivityLog } from "./firebase-db"

export class ActivityLogger {
  // Helper method to get client IP (in a real app, this would come from server-side)
  private static getClientIP(): string | undefined {
    // In a browser environment, we can't get the real IP
    // This would typically be handled server-side
    return undefined
  }

  // Authentication activities
  static async logLogin(userId: string, success: boolean, details?: string) {
    try {
      await FirebaseDB.logActivity(
        success ? "user.login.success" : "user.login.failed",
        "Auth",
        success ? "Success" : "Error",
        details || (success ? "Đăng nhập thành công" : "Đăng nhập thất bại"),
        userId,
        undefined,
        this.getClientIP(),
      )
    } catch (error) {
      console.error("Failed to log login activity:", error)
    }
  }

  static async logLogout(userId: string) {
    try {
      await FirebaseDB.logActivity(
        "user.logout",
        "Auth",
        "Information",
        "Đăng xuất khỏi hệ thống",
        userId,
        undefined,
        this.getClientIP(),
      )
    } catch (error) {
      console.error("Failed to log logout activity:", error)
    }
  }

  static async logSessionExpired(userId: string) {
    try {
      await FirebaseDB.logActivity(
        "user.session.expired",
        "Auth",
        "Warning",
        "Phiên đăng nhập đã hết hạn",
        userId,
        undefined,
        this.getClientIP(),
      )
    } catch (error) {
      console.error("Failed to log session expiry:", error)
    }
  }

  static async logPasswordReset(email: string, success: boolean) {
    try {
      await FirebaseDB.logActivity(
        success ? "user.password.reset.success" : "user.password.reset.failed",
        "Auth",
        success ? "Information" : "Warning",
        success
          ? `Yêu cầu đặt lại mật khẩu thành công cho: ${email}`
          : `Yêu cầu đặt lại mật khẩu thất bại cho: ${email}`,
        undefined,
        email,
        this.getClientIP(),
      )
    } catch (error) {
      console.error("Failed to log password reset activity:", error)
    }
  }

  static async logAccountLocked(userId: string, reason: string) {
    try {
      await FirebaseDB.logActivity(
        "user.account.locked",
        "Auth",
        "Warning",
        `Tài khoản bị khóa: ${reason}`,
        userId,
        undefined,
        this.getClientIP(),
      )
    } catch (error) {
      console.error("Failed to log account lock activity:", error)
    }
  }

  // Product activities
  static async logProductCreate(userId: string, productName: string) {
    await FirebaseDB.logActivity(
      "product.create",
      "Product",
      "Success",
      `Tạo sản phẩm mới: ${productName}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logProductUpdate(userId: string, productName: string) {
    await FirebaseDB.logActivity(
      "product.update",
      "Product",
      "Information",
      `Cập nhật sản phẩm: ${productName}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logProductDelete(userId: string, productName: string) {
    await FirebaseDB.logActivity(
      "product.delete",
      "Product",
      "Warning",
      `Xóa sản phẩm: ${productName}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  // Content activities
  static async logPostCreate(userId: string, postTitle: string) {
    await FirebaseDB.logActivity(
      "post.create",
      "Content",
      "Success",
      `Tạo bài viết mới: ${postTitle}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logPostUpdate(userId: string, postTitle: string) {
    await FirebaseDB.logActivity(
      "post.update",
      "Content",
      "Information",
      `Cập nhật bài viết: ${postTitle}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logPostDelete(userId: string, postTitle: string) {
    await FirebaseDB.logActivity(
      "post.delete",
      "Content",
      "Warning",
      `Xóa bài viết: ${postTitle}`,
      userId,
      undefined,
      this.getClientIP(),
    )
  }

  // User management activities
  static async logUserCreate(adminId: string, newUserEmail: string) {
    await FirebaseDB.logActivity(
      "user.create",
      "User",
      "Success",
      `Tạo tài khoản người dùng mới: ${newUserEmail}`,
      adminId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logUserUpdate(adminId: string, userEmail: string) {
    await FirebaseDB.logActivity(
      "user.update",
      "User",
      "Information",
      `Cập nhật thông tin người dùng: ${userEmail}`,
      adminId,
      undefined,
      this.getClientIP(),
    )
  }

  static async logUserDelete(adminId: string, userEmail: string) {
    await FirebaseDB.logActivity(
      "user.delete",
      "User",
      "Warning",
      `Xóa tài khoản người dùng: ${userEmail}`,
      adminId,
      undefined,
      this.getClientIP(),
    )
  }

  // System activities
  static async logSystemBackup() {
    try {
      await FirebaseDB.logActivity(
        "system.backup",
        "System",
        "Success",
        "Backup tự động hoàn thành",
        undefined,
        "system",
        undefined,
      )
    } catch (error) {
      console.error("Failed to log system backup:", error)
    }
  }

  static async logSystemError(error: string) {
    try {
      await FirebaseDB.logActivity(
        "system.error",
        "System",
        "Error",
        `Lỗi hệ thống: ${error}`,
        undefined,
        "system",
        undefined,
      )
    } catch (error) {
      console.error("Failed to log system error:", error)
    }
  }

  // Contact activities
  static async logContactReceived(customerEmail: string, subject: string) {
    await FirebaseDB.logActivity(
      "contact.received",
      "User",
      "Information",
      `Nhận liên hệ mới từ ${customerEmail}: ${subject}`,
      undefined,
      customerEmail,
      this.getClientIP(),
    )
  }

  static async logContactReply(adminId: string, customerEmail: string) {
    await FirebaseDB.logActivity(
      "contact.reply",
      "User",
      "Success",
      `Phản hồi liên hệ từ khách hàng: ${customerEmail}`,
      adminId,
      undefined,
      this.getClientIP(),
    )
  }

  // Generic logging method
  static async log(
    action: string,
    type: ActivityLog["type"],
    level: ActivityLog["level"],
    details: string,
    userId?: string,
    actorDetails?: string,
  ) {
    await FirebaseDB.logActivity(action, type, level, details, userId, actorDetails, this.getClientIP())
  }
}
