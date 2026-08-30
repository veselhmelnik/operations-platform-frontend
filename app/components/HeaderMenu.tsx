'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderMenu = () => {
  const path = usePathname()
  console.log(path)
  return (
    <Link
      href={path==='/' ? '/projects' : '/'}
      className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
    >
      <span>{path==='/' ? 'Projects & Tasks' : 'Dashboard'}</span>
    </Link>
  )
}

export default HeaderMenu
