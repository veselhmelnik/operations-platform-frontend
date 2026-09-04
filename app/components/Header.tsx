import LogoutButton from './LogoutButton'

const Header = () => {
  return (
    <header className="border-b border-green-300/30 h-20 flex justify-end items-center px-6 shadow-md shadow-gray-200">
      <LogoutButton />
    </header>
  )
}

export default Header
