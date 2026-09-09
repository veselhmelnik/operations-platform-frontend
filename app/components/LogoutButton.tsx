'use client'
import { useRouter } from 'next/navigation'
import { RiLogoutBoxRFill } from 'react-icons/ri'
import { logout } from '../lib/api/auth'
import { apiClient } from '../lib/api/api-client'
import { routes } from '../lib/routes'

const LogoutButton = () => {
  const router = useRouter()

  const handleLogout = async () => {
    await logout(apiClient)
    router.push(routes.login())
    router.refresh()
  }
  return (
    <button
      onClick={handleLogout}
      aria-label="Log out"
      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg border border-border bg-muted text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive md:size-7.5"
    >
      <RiLogoutBoxRFill size={14} />
    </button>
  )
}

export default LogoutButton
