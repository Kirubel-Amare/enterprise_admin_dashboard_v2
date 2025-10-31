// utils/apiFetch.ts
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const isServer = typeof window === 'undefined';

  // If endpoint is an absolute URL, use it as-is.
  const isAbsolute = /^https?:\/\//i.test(endpoint);

  // Build a base URL for server-side requests. For client-side, prefer
  // a public base provided by NEXT_PUBLIC_BASE_URL (optional).
  const clientBase = process.env.NEXT_PUBLIC_BASE_URL || '';

  // Server-side: prefer NEXT_PUBLIC_BASE_URL, then NEXTAUTH_URL / BASE_URL,
  // then fall back to localhost with PORT. This makes SSR fetches explicit
  // instead of relying on an implicit host that can result in ECONNREFUSED.
  const serverBase =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    process.env.BASE_URL ||
    `http://localhost:${process.env.PORT || 3000}`;

  const baseUrl = isServer ? serverBase : clientBase;

  try {
    const url = isAbsolute ? endpoint : `${baseUrl}${endpoint}`;

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`API fetch failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    // Re-throw with extra context so callers can decide how to handle it.
    // Also log here for debugging.
    console.error('API fetch error:', { endpoint, baseUrl, error });
    throw error;
  }
}
