// utils/apiFetch.ts
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === 'undefined';
  const isAbsolute = /^https?:\/\//i.test(endpoint);

  // Normalize base URL (remove trailing slash if present)
  const baseUrlRaw =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.BASE_URL ||
    (isServer ? `http://localhost:${process.env.PORT || 3000}` : '');

  const baseUrl = baseUrlRaw.replace(/\/$/, ''); // remove trailing slash

  try {
    const url = isAbsolute ? endpoint : `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    }

    // Safely attempt to parse JSON
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    } else {
      throw new Error(`Invalid response format from ${url}`);
    }
  } catch (error) {
    console.error('API fetch error:', { endpoint, baseUrl, error });
    throw error;
  }
}
