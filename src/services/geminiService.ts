import * as GoogleGenerativeAI from "@google/generative-ai"

const apiKey = import.meta.env.VITE_API_KEY
// Cambiamos la forma de crear la instancia para evitar el error de exportación
const genAI = new GoogleGenerativeAI.GoogleGenAI(apiKey || "")

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const prompt = `Actúa como un chef. Crea una receta con: ${ingredients.join(', ')}. Responde en español.`
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error(error)
    throw new Error("Fallo en la conexión con la IA")
  }
}
