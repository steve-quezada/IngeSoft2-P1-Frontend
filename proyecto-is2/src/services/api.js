const API_URL = 'http://localhost:5000';

export const api = {
  //  Crear una nueva pregunta
  createQuestion: async (title, description, anonymous = false, authorName = "") => {
    const response = await fetch(`${API_URL}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  //  Obtener todas las preguntas
  getQuestions: async () => {
    const response = await fetch(`${API_URL}/questions`);
    if (!response.ok) {
      throw new Error('Error al obtener las preguntas');
    }
    return response.json();
  },

  // Obtener respuestas de una pregunta
  getAnswers: async (questionId) => {
    const response = await fetch(`${API_URL}/questions/${questionId}/answers`);
    if (!response.ok) {
      throw new Error('Error al obtener las respuestas');
    }
    return response.json();
  },

  // Crear respuesta para una pregunta
  createAnswer: async (questionId, text) => {
    const response = await fetch(`${API_URL}/questions/${questionId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear la respuesta');
    }
    return response.json();
  },

  // Votar una respuesta
  voteAnswer: async (questionId, answerId, change) => {
    const response = await fetch(`${API_URL}/questions/${questionId}/answers/${answerId}/vote`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ change }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al votar la respuesta');
    }
    return response.json();
  },
};
