const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const api = {
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  getUserData: (userId) => request(`/users/${userId}/data`),

  saveBMI: (userId, payload) =>
    request(`/users/${userId}/bmi`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  deleteBMI: (userId, recordId) =>
    request(`/users/${userId}/bmi/${recordId}`, {
      method: 'DELETE'
    }),

  saveWorkout: (userId, payload) =>
    request(`/users/${userId}/workouts`, {
      method: 'POST',
      body: JSON.stringify(payload)
    }),

  updateProfile: (userId, payload) =>
    request(`/users/${userId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    })
}
