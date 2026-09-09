const BACKEND_URL =
    process.env.BACKEND_URL ??
    'http://localhost:3001/'

async function proxy(
    request: Request,
    context: { params: Promise<{ path: string[] }> },
) {
    const { path } = await context.params

    const url = new URL(
        `/${path.join('/')}`,
        BACKEND_URL,
    )

    const incomingUrl = new URL(request.url)
    url.search = incomingUrl.search

    const headers = new Headers()

    const contentType = request.headers.get('content-type')
    if (contentType) {
        headers.set('content-type', contentType)
    }

    const cookie = request.headers.get('cookie')
    if (cookie) {
        headers.set('cookie', cookie)
    }

    const init: RequestInit = {
        method: request.method,
        headers,
        redirect: 'manual',
    }

    if (
        request.method !== 'GET' &&
        request.method !== 'HEAD'
    ) {
        init.body = await request.arrayBuffer()
    }

    const backendResponse = await fetch(url, init)

    const responseHeaders = new Headers(backendResponse.headers)

    responseHeaders.delete('content-encoding')
    responseHeaders.delete('content-length')
    responseHeaders.delete('transfer-encoding')

    return new Response(backendResponse.body, {
        status: backendResponse.status,
        headers: responseHeaders,
    })
}

export const GET = proxy
export const POST = proxy
export const PATCH = proxy
export const PUT = proxy
export const DELETE = proxy