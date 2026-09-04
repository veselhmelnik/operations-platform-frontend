import { cookies } from "next/headers"

const API_URL = process.env.NEXT_PUBLIC_API_URL

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
    })

    if (!response.ok) {
        const error = await response.json().catch(() => null)

        throw new Error(
            error?.message || `API error: ${response.status}`,
        )
    }

    return response.json()
}