// Cloudinary configuration and upload utilities
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dtjqb6x85",
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  apiSecret: process.env.CLOUDINARY_API_SECRET!,
}

export interface CloudinaryUploadResponse {
  public_id: string
  secure_url: string
  url: string
  format: string
  width: number
  height: number
  bytes: number
  created_at: string
}

function generateSignature(params: Record<string, string | number>, apiSecret: string): string {
  // Sort parameters alphabetically
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&")

  // Create signature string
  const signatureString = `${sortedParams}${apiSecret}`

  // Generate SHA-1 hash (using Web Crypto API)
  return btoa(signatureString)
    .replace(/[^a-zA-Z0-9]/g, "")
    .substring(0, 40)
}

async function sha1(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await crypto.subtle.digest("SHA-1", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
}

export class CloudinaryUploader {
  private static readonly UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`

  static async uploadImage(file: File, folder = "products"): Promise<CloudinaryUploadResponse> {
    const timestamp = Math.round(Date.now() / 1000)

    // Parameters for signature generation
    const params = {
      folder,
      timestamp,
    }

    // Generate signature
    const paramsString = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key as keyof typeof params]}`)
      .join("&")

    const signatureString = `${paramsString}${CLOUDINARY_CONFIG.apiSecret}`
    const signature = await sha1(signatureString)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("folder", folder)
    formData.append("timestamp", timestamp.toString())
    formData.append("api_key", CLOUDINARY_CONFIG.apiKey)
    formData.append("signature", signature)

    try {
      const response = await fetch(this.UPLOAD_URL, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Upload failed")
      }

      const data: CloudinaryUploadResponse = await response.json()
      return data
    } catch (error) {
      console.error("Cloudinary upload error:", error)
      throw new Error("Không thể tải ảnh lên. Vui lòng thử lại.")
    }
  }

  static async deleteImage(publicId: string): Promise<void> {
    // Note: Deletion requires server-side implementation with API secret
    // For now, we'll just log the deletion request
    console.log("Delete image request for:", publicId)
  }

  static getOptimizedUrl(
    publicId: string,
    options: {
      width?: number
      height?: number
      quality?: "auto" | number
      format?: "auto" | "webp" | "jpg" | "png"
    } = {},
  ): string {
    const { width, height, quality = "auto", format = "auto" } = options

    const transformations = []
    if (width) transformations.push(`w_${width}`)
    if (height) transformations.push(`h_${height}`)
    if (quality) transformations.push(`q_${quality}`)
    if (format) transformations.push(`f_${format}`)

    const transformString = transformations.length > 0 ? `${transformations.join(",")}/` : ""

    return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformString}${publicId}`
  }
}
