import * as GoogleGenerativeAI from "@google/generative-ai"

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY || ""
    if (!apiKey) throw new Error("Falta la API Key")
    
    // Accedemos a la clase directamente desde el paquete completo
    const genAI = new GoogleGenerativeAI.GoogleGenAI(apiKey)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const prompt = `Actúa como un chef profesional. Crea una receta con: ${ingredients.join(', ')}. Responde en español.`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
