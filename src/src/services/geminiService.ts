import { GoogleGenAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenAI(apiKey || "");

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Actúa como un chef profesional y creativo. Crea una receta deliciosa usando estos ingredientes: ${ingredients.join(', ')}. 
    Responde en español, con un título llamativo, una lista de pasos clara y un consejo del chef al final.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error("Error detallado:", error);
    throw new Error("El Chef está descansando: " + (error.message || "error de conexión"));
  }
};
