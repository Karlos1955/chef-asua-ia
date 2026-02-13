export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // Llamamos directamente a la "puerta" de Google sin usar librerías externas
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Actúa como un chef profesional. Crea una receta con: ${ingredients.join(', ')}. Responde en español.` }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return data.candidates[0].content.parts[0].text;
    
  } catch (error: any) {
    console.error("Error detallado:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
