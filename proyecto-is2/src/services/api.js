const API_URL = 'http://localhost:5000';

export const api = {
  // Crear una nueva pregunta
  createQuestion: async (title, description, anonymous = false, authorName = "") => {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        anonymous,
        author_name: authorName,
      }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la pregunta');
    }
    
    return response.json();
  },

  // Obtener todas las preguntas
  getQuestions: async () => {
    const response = await fetch(`${API_URL}/questions`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las preguntas');
    }
    
    return response.json();
  },
};
