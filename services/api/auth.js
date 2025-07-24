const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function getCSRFToken() {
  // Placeholder: implement CSRF token retrieval if needed
  return '';
}

export const authAPI = {
  signup: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': await getCSRFToken(),
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      let error = 'Signup failed';
      try {
        const data = await response.json();
        error = data.message || error;
      } catch {}
      throw new Error(error);
    }
    return response.json();
  },
}; 