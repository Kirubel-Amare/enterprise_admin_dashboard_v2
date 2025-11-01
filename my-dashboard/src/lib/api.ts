// lib/api.ts
class ApiClient {
  private getBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // Client-side: use relative path or configured URL
      return process.env.NEXT_PUBLIC_API_URL || '';
    }
    
    // Server-side: construct absolute URL
    let baseUrl = 
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXTAUTH_URL ||
      process.env.BASE_URL;
    
    if (!baseUrl) {
      // Fallback for development and build time
      baseUrl = `http://localhost:${process.env.PORT || 3000}`;
    }
    
    // Ensure no trailing slash
    return baseUrl.replace(/\/$/, '');
  }

  async fetch(endpoint: string) {
    const baseUrl = this.getBaseUrl();
    // Ensure endpoint starts with slash for consistency
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}/api${normalizedEndpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Important for static generation
        next: { revalidate: 60 }
      });

      if (!response.ok) {
        // Handle different error types
        if (response.status === 404) {
          throw new Error(`API endpoint not found: ${endpoint}`);
        }
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      
      // Return fallback data for build time
      if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
        console.log('Returning empty data for build');
        return [];
      }
      
      throw error;
    }
  }
}

export const apiClient = new ApiClient();

// API functions with error handling for build time
export const api = {
  dashboard: {
    getData: () => apiClient.fetch('/dashboard')
  },
  users: {
    getData: () => apiClient.fetch('/users')
  },
  analytics: {
    getData: () => apiClient.fetch('/analytics')
  },
  sales: {
    getData: () => apiClient.fetch('/sales')
  },
  products: {
    getData: () => apiClient.fetch('/products')
  }
}