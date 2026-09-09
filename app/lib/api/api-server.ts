import { cookies } from 'next/headers'

const API_URL =
  process.env.BACKEND_URL ||
  'http://localhost:3000/backend'

export async function apiServer<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies()

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookieStore.toString(),
      ...options?.headers,
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => null)

    throw new Error(
      error?.message || `API error: ${response.status}`,
    )
  }

  return response.json()
}