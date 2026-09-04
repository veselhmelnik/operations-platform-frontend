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
      className="cursor-pointer inline-flex items-center justify-center rounded-md bg-primary p-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
    >
      <RiLogoutBoxRFill size={22} />
    </button>
  )
}

export default LogoutButton
