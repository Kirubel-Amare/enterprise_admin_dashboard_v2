// utils/apiFetch.ts
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  try {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer
      ? '' // relative path works server-side
      : process.env.NEXT_PUBLIC_BASE_URL || '';

    const res = await fetch(`${baseUrl}${endpoint}`, options);

    if (!res.ok) {
      throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API fetch error:', error);
    return null;
  }
}
