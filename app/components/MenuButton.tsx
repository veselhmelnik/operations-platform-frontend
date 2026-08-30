import Link from 'next/link'
import { IconType } from 'react-icons'

type Props = {
  icon: IconType
  name: string
  href: string
  isActive: boolean
}

const MenuButton = ({
  icon: Icon,
  name,
  href,
  isActive,
}: Props) => {
  return (
    <Link
      href={href}
      className={`
    flex items-center justify-center
    bg-black/30
    text-white
    rounded-full
    transition-all duration-300
    overflow-hidden
    hover:bg-black/70
    ${
      isActive
        ? 'px-3 py-2 gap-2'
        : 'p-2 gap-0'
    }
  `}
    >
      <Icon size={22} />

      <span
        className={`
          whitespace-nowrap
          transition-all duration-300
          ${
            isActive
              ? 'max-w-30 opacity-100'
              : 'max-w-0 opacity-0'
          }
        `}
      >
        {name}
      </span>
    </Link>
  )
}

export default MenuButton