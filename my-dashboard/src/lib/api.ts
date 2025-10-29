const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function fetchAPI(endpoint: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // In a real app, you might want to add caching
      // next: { revalidate: 60 } // Revalidate every 60 seconds
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API fetch error:', error)
    throw error
  }
}

// Specific API functions
export const api = {
  dashboard: {
    getData: () => fetchAPI('/dashboard')
  },
  users: {
    getData: () => fetchAPI('/users')
  },
  analytics: {
    getData: () => fetchAPI('/analytics')
  },
  sales: {
    getData: () => fetchAPI('/sales')
  }
}
  