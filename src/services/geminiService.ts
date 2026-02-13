import { GoogleGenAI } from "@google/generative-ai"

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenAI(apiKey || "");

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Actúa como un chef profesional. Crea una receta con estos ingredientes: ${ingredients.join(', ')}. Responde en español con pasos claros.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(error);
    throw new Error("El chef ha tenido un problema en la cocina.");
  }
};
