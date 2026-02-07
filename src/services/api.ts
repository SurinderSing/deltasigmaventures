/**
 * API Configuration
 * Change this to point to your real API in production
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic fetch wrapper with error handling
 */
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    throw new ApiError(
      `API request failed: ${response.statusText}`,
      response.status,
      response.statusText,
    );
  }

  return response.json() as Promise<T>;
}

/**
 * HTTP methods
 */
export const api = {
  get: <T>(endpoint: string): Promise<T> => request<T>(endpoint),

  post: <T>(endpoint: string, data: unknown): Promise<T> =>
    request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  put: <T>(endpoint: string, data: unknown): Promise<T> =>
    request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  patch: <T>(endpoint: string, data: unknown): Promise<T> =>
    request<T>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  delete: <T>(endpoint: string): Promise<T> =>
    request<T>(endpoint, {
      method: "DELETE",
    }),
};
