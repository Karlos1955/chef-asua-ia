import { GoogleGenAI } from "@google/generative-ai"

const apiKey = import.meta.env.VITE_API_KEY
const genAI = new GoogleGenAI(apiKey || "")

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `Crea una receta con: ${ingredients.join(', ')}. Responde en español.`
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    throw new Error("Fallo en la conexión con la IA")
  }
}
