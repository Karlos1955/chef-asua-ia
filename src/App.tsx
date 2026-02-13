import React, { useState } from 'react';
import { generateRecipe } from './services/geminiService';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!ingredients) return alert("¡Escribe algún ingrediente!");
    setLoading(true);
    setRecipe(''); // Limpiamos la receta anterior
    try {
      const result = await generateRecipe(ingredients.split(','));
      setRecipe(result);
    } catch (e: any) {
      alert("Vaya, algo ha fallado: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#1a73e8', marginBottom: '10px' }}>👨‍🍳 Chef Asua AI</h1>
        <p style={{ textAlign: 'center', color: '#5f6368', marginBottom: '25px' }}>Dime qué tienes y crearé una receta para ti</p>
        
        <textarea 
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ejemplo: patatas, huevos, cebolla..."
          style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '10px', border: '1px solid #dadce0', fontSize: '16px', marginBottom: '20px', resize: 'none' }}
        />
        
        <button 
          onClick={handleGenerate} 
          disabled={loading}
          style={{ width: '100%', padding: '15px', backgroundColor: loading ? '#ccc' : '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
        >
          {loading ? 'Cocinando tu receta...' : '¡Generar Receta!'}
        </button>

        {recipe && (
          <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '10px', borderLeft: '5px solid #1a73e8', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {recipe}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
