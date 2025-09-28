import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/gemini-ai"
import { FirebaseDB } from "@/lib/firebase-db"

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Get active chat prompt configuration
    const promptConfig = await FirebaseDB.getActiveChatPrompt()

    let systemPrompt = `Bạn là trợ lý AI thông minh của Inox Việt Nam, chuyên cung cấp thông tin về các sản phẩm inox chất lượng cao. 

NHIỆM VỤ:
- Tư vấn sản phẩm inox (thép không gỉ) chuyên nghiệp
- Hỗ trợ báo giá và thông tin kỹ thuật
- Giải đáp thắc mắc về ứng dụng và tính năng sản phẩm
- Hướng dẫn lựa chọn sản phẩm phù hợp

PHONG CÁCH GIAO TIẾP:
- Thân thiện, chuyên nghiệp và nhiệt tình
- Sử dụng tiếng Việt tự nhiên
- Cung cấp thông tin chính xác và hữu ích
- Luôn sẵn sàng hỗ trợ khách hàng

LƯU Ý:
- Nếu không có thông tin cụ thể, hãy đề xuất liên hệ trực tiếp để được tư vấn chi tiết
- Luôn khuyến khích khách hàng liên hệ để được báo giá chính xác nhất
- Không đưa ra cam kết về giá cả mà không có thông tin đầy đủ`

    let context = ""

    // Build context from prompt configuration if available
    if (promptConfig) {
      systemPrompt = promptConfig.prompt
      context = await FirebaseDB.buildChatContext(promptConfig)
    }

    // Generate response using Gemini AI
    const response = await geminiAI.generateResponse(message, context, systemPrompt)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Chat API Error:", error)
    return NextResponse.json({ error: "Không thể xử lý yêu cầu. Vui lòng thử lại sau." }, { status: 500 })
  }
}
