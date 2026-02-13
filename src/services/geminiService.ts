export const generateRecipe = async (ingredients: string[]) => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) throw new Error("Falta la API Key en Vercel");

    // CAMBIO CLAVE: Usamos 'gemini-pro' en lugar de 'gemini-1.5-flash'
    // Y volvemos a 'v1beta' que es más flexible con los nombres de modelos
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

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
      // Si el error dice "API_KEY_INVALID", entonces el problema es la llave
      throw new Error(data.error.message);
    }

    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("El modelo no devolvió texto. Prueba con otros ingredientes.");
    }
    
  } catch (error: any) {
    console.error("Error:", error);
    throw new Error(error.message || "Error de conexión");
  }
};
