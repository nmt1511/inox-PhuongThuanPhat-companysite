import { FirebaseDB } from "../lib/firebase-db"
import defaultPromptsData from "../data/default-chat-prompts.json"

async function initializeChatPrompts() {
  try {
    console.log("🚀 Initializing chat prompts...")

    // Check if prompts already exist
    const existingPrompts = await FirebaseDB.getChatPrompts()
    if (existingPrompts.length > 0) {
      console.log("✅ Chat prompts already exist, skipping initialization")
      return
    }

    // Add default prompts
    for (const promptData of defaultPromptsData.defaultPrompts) {
      await FirebaseDB.addChatPrompt(promptData)
      console.log(`✅ Added prompt: ${promptData.name}`)
    }

    console.log("🎉 Chat prompts initialized successfully!")
  } catch (error) {
    console.error("❌ Error initializing chat prompts:", error)
    throw error
  }
}

// Run the initialization
initializeChatPrompts()
  .then(() => {
    console.log("✅ Chat prompt initialization completed")
    process.exit(0)
  })
  .catch((error) => {
    console.error("❌ Chat prompt initialization failed:", error)
    process.exit(1)
  })
