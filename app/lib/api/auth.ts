import { apiFetch } from "./api";

export type CurrentUser = {
    id: string
    email: string
}

export function login(email: string, password: string) {
    return apiFetch<{ message: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    })
}

export function logout() {
    return apiFetch<{message: string}>('/auth/logout', {
        method: 'POST'
    })
}

export function getCurrentUser() {
    return apiFetch<CurrentUser>('/auth/me')
}