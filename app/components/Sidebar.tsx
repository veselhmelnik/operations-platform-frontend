'use client'

import Image from 'next/image'
import Link from 'next/link'
import OrganizationSelector from './OrganizationSelector'
import SidebarMenu from './SidebarMenu'
import SubscriptionCard from './SubscriptionCard'
import SidebarUser from './SidebarUser'

const Sidebar = () => {
  return (
    <aside className="sticky top-0 w-70 flex flex-col justify-between h-dvh border-r border-gray-300 shadow-md shadow-gray-400 p-6 ">
      <div className="flex flex-col gap-6">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/assets/logo2.jpg" alt="logo" width={50} height={50} />
            <h1 className="text-2xl text-green-600 font-semibold italic font-serif mr-20">
              TaskFlow
            </h1>
          </div>
        </Link>
        <OrganizationSelector />
        <SidebarMenu />
        <SubscriptionCard />
      </div>

      <SidebarUser />
    </aside>
  )
}

export default Sidebar
