import * as GoogleAI from "@google/generative-ai";

export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // Accedemos a la clase a través del alias 'GoogleAI'
    const genAI = new GoogleAI.GoogleGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Actúa como un chef profesional. Crea una receta con: ${ingredients.join(', ')}. Responde en español.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Error en el servicio:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
