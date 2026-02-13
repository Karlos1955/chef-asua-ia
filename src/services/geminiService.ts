import { GoogleGenAI } from "@google/generative-ai";

export const generateRecipe = async (ingredients: string[]) => {
  try {
    // 1. Obtenemos la llave de forma directa
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("No se encontró la VITE_API_KEY en Vercel");

    // 2. Inicializamos la IA
    const genAI = new GoogleGenAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Preparamos el mensaje
    const prompt = `Actúa como un chef profesional. Crea una receta creativa y deliciosa usando únicamente estos ingredientes: ${ingredients.join(', ')}. Responde en español, con un título, ingredientes y pasos claros.`;

    // 4. Pedimos la receta
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
    
  } catch (error: any) {
    console.error("Error en el servicio:", error);
    throw new Error(error.message || "Error al conectar con el Chef");
  }
};
