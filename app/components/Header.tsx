import Image from 'next/image'
import LogoutButton from './LogoutButton'
import HeaderMenu from './HeaderMenu'

const Header = () => {
  return (
    <header className="border-b border-green-300/30 h-20 flex justify-between items-center px-6 shadow-md shadow-gray-200">
      <div className="flex items-center gap-3">
        <Image src="/assets/logo2.jpg" alt="logo" width={50} height={50} />
        <h1 className="text-2xl text-green-600 font-semibold italic font-serif mr-20">
          TaskFlow
        </h1>
        <HeaderMenu />
      </div>
      <LogoutButton />
    </header>
  )
}

export default Header
