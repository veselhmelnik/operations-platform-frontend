import { ApiFetcher } from "./api-client"

export type CurrentUser = {
    id: string
    email: string
}

export function login(api: ApiFetcher, email: string, password: string) {
    return api<{ message: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    })
}

export function logout(api: ApiFetcher) {
    return api<{message: string}>('/auth/logout', {
        method: 'POST'
    })
}

export function getCurrentUser(api: ApiFetcher) {
    return api<CurrentUser>('/auth/me')
}