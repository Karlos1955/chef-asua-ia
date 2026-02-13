import React, { useState } from 'react';
import { generateRecipe } from './services/geminiService';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients) return alert("Por favor, escribe algunos ingredientes");
    setLoading(true);
    try {
      const result = await generateRecipe(ingredients.split(','));
      setRecipe(result);
    } catch (e) {
      alert("Vaya, algo ha fallado: " + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ color: '#0070f3' }}>👨‍🍳 Chef Asua AI</h1>
      <p>¿Qué tienes en la nevera hoy?</p>
      
      <textarea 
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ej: patatas, huevos, cebolla..."
        style={{ 
          width: '100%', 
          height: '100px', 
          marginBottom: '10px', 
          borderRadius: '8px', 
          padding: '10px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        style={{ 
          width: '100%', 
          padding: '12px', 
          cursor: loading ? 'not-allowed' : 'pointer', 
          background: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px', 
          fontSize: '16px',
          fontWeight: 'bold'
        }}
      >
        {loading ? 'Cocinando con la IA...' : 'Generar Receta'}
      </button>

      {recipe && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          background: '#f9f9f9', 
          borderRadius: '10px', 
          textAlign: 'left',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          whiteSpace: 'pre-wrap',
          lineHeight: '1.6'
        }}>
          {recipe}
        </div>
      )}
    </div>
  );
}

export default App;
