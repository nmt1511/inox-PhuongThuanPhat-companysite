import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export interface ChatPromptConfig {
  id?: string
  name: string
  prompt: string
  isActive: boolean
  includeProducts: boolean
  includeNews: boolean
  includeCategories: boolean
  includeContacts: boolean
  createdAt: string
  updatedAt?: string
}

export class GeminiAI {
  private model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

  async generateResponse(message: string, context?: string, systemPrompt?: string): Promise<string> {
    try {
      const fullPrompt = this.buildPrompt(message, context, systemPrompt)
      const result = await this.model.generateContent(fullPrompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Gemini AI Error:", error)
      throw new Error("Không thể tạo phản hồi từ AI. Vui lòng thử lại sau.")
    }
  }

  private buildPrompt(message: string, context?: string, systemPrompt?: string): string {
    let prompt = ""

    if (systemPrompt) {
      prompt += `Hệ thống: ${systemPrompt}\n\n`
    }

    if (context) {
      prompt += `Thông tin tham khảo:\n${context}\n\n`
    }

    prompt += `Người dùng: ${message}`

    return prompt
  }

  async generateStreamResponse(message: string, context?: string, systemPrompt?: string): Promise<ReadableStream> {
    const fullPrompt = this.buildPrompt(message, context, systemPrompt)

    const result = await this.model.generateContentStream(fullPrompt)

    return new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text()
            controller.enqueue(new TextEncoder().encode(chunkText))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })
  }
}

export const geminiAI = new GeminiAI()
