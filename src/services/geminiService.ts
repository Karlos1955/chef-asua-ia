import * as GoogleGenerativeAI from "@google/generative-ai";

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // Usamos una comprobación doble para encontrar la clase GoogleGenAI
    // Esto soluciona el error de "not exported" en todas las versiones
    const GenAIClass = (GoogleGenerativeAI as any).GoogleGenAI || 
                       (GoogleGenerativeAI as any).default?.GoogleGenAI;

    if (!GenAIClass) {
      throw new Error("No se pudo cargar la librería de Google");
    }

    const genAI = new GenAIClass(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Actúa como un chef profesional. Crea una receta con: ${ingredients.join(', ')}. Responde en español.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Error detallado:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
