'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { apiClient } from '@/app/lib/api/api-client'
import { routes } from '@/app/lib/routes'
import LogoMark from '@/app/components/LogoMark'
import {
  btnPrimary,
  fieldInput,
  fieldLabel,
} from '@/app/utils/tailwind-constants'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || routes.dashboard()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      await apiClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      })
      router.push(next)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Registration failed'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <LogoMark />
          <span className="text-base font-bold tracking-[-0.035em] text-primary">
            TaskFlow
          </span>
        </div>

        <div className="animate-spring-in rounded-2xl border border-border bg-card p-6">
          <h1 className="text-lg font-semibold tracking-[-0.015em]">
            Create your account
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Start planning and tracking work in minutes.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3.5">
            {error && <p className="text-xs text-destructive">{error}</p>}

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Full name</span>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Maria Kane"
                required
                minLength={2}
                maxLength={50}
                className={fieldInput}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className={fieldInput}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className={fieldInput}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabel}>Confirm password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                required
                className={fieldInput}
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className={`${btnPrimary} mt-1 w-full`}
            >
              {isLoading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={routes.login(next)}
            className="font-medium text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  )
}
