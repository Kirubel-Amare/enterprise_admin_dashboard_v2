// utils/apiFetch.ts
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === 'undefined';
  const isAbsolute = /^https?:\/\//i.test(endpoint);

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.BASE_URL ||
    (isServer ? `http://localhost:${process.env.PORT || 3000}` : '');

  try {
    const url = isAbsolute ? endpoint : `${baseUrl}${endpoint}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('API fetch error:', { endpoint, baseUrl, error });
    throw error;
  }
}
