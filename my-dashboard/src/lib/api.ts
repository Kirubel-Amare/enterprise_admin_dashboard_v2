// Build a base URL that is safe for server-side rendering and for client-side
// usage. Client-side should prefer NEXT_PUBLIC_API_URL (if set) and default
// to relative paths. Server-side will use NEXT_PUBLIC_API_URL or NEXTAUTH_URL
// or BASE_URL, and finally fall back to localhost with PORT.
const isServer = typeof window === 'undefined';
const clientBase = process.env.NEXT_PUBLIC_API_URL || '';
const serverBase =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXTAUTH_URL ||
  process.env.BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

const API_BASE_URL = isServer ? serverBase : clientBase;

export async function fetchAPI(endpoint: string) {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // In a real app, you might want to add caching
      // next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', { endpoint, url: `${API_BASE_URL}/api${endpoint}`, error });
    throw error;
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
  