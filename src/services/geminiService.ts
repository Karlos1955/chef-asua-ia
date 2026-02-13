export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // URL actualizada con la ruta completa del modelo
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Actúa como un chef profesional. Crea una receta creativa con estos ingredientes: ${ingredients.join(', ')}. Responde en español.` }]
        }]
      })
    });

    const data = await response.json();
    
    // Si hay un error en la respuesta de Google, lo mostramos
    if (data.error) {
      throw new Error(data.error.message);
    }

    // Verificamos que tengamos respuesta antes de intentar leerla
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("Google no devolvió una receta válida");
    }
    
  } catch (error: any) {
    console.error("Error detallado:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
