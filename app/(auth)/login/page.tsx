'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { apiClient } from '@/app/lib/api/api-client'
import { login } from '@/app/lib/api/auth'
import { routes } from '@/app/lib/routes'
import LogoMark from '@/app/components/LogoMark'
import {
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || routes.dashboard()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setIsLoading(true)

    try {
      await login(apiClient, email, password)
      router.push(next)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <LogoMark />
          <span className="text-base font-bold tracking-[-0.035em] text-primary">
            TaskFlow
          </span>
        </div>

        <div className="animate-spring-in rounded-2xl border border-border bg-card p-6">
          <h1 className="text-lg font-semibold tracking-[-0.015em]">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign in to continue to your workspace.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
            {error && <p className="text-xs text-destructive">{error}</p>}

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Email</span>
              <input
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={fieldInput}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={fieldInput}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className={`${btnPrimary} mt-1 w-full`}
            >
              {isLoading ? 'Signing in…' : 'Log in'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            href={`/register?next=${encodeURIComponent(next)}`}
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
