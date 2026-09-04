const API_URL = process.env.NEXT_PUBLIC_API_URL

export type ApiFetcher = <T>(
    path: string,
    options?: RequestInit
) => Promise<T>

export async function apiClient<T>(
    path: string,
    options?: RequestInit,
): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
    })

    if (!response.ok) {
        const error = await response.json().catch(() => null)

        throw new Error(
            error?.message || `API error: ${response.status}`,
        )
    }

    return response.json()
}