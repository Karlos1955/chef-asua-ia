import { GoogleGenAI } from "@google/generative-ai"

// Usamos una función para obtener la API Key de forma segura
const getApiKey = () => import.meta.env.VITE_API_KEY || ""

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = getApiKey()
    if (!apiKey) throw new Error("Falta la API Key en Vercel")
    
    const genAI = new GoogleGenAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `Actúa como un chef. Crea una receta con: ${ingredients.join(', ')}. Responde en español.`
    
    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error en el Chef:", error)
    throw error
  }
}
