'use client'

import Image from 'next/image'
import Link from 'next/link'
import OrganizationSelector from './OrganizationSelector'
import InviteMemberModal from './Modals/InviteMemberModal'
import { useState } from 'react'
import { useProjectParams } from '../hooks/useParams'

const Sidebar = () => {
  const { organizationId } = useProjectParams()
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)

  return (
    <>
      <aside className="sticky top-0 w-70 flex flex-col justify-between h-dvh border-r border-gray-300 shadow-md shadow-gray-400 p-6 ">
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/assets/logo2.jpg" alt="logo" width={50} height={50} />
            <h1 className="text-2xl text-green-600 font-semibold italic font-serif mr-20">
              TaskFlow
            </h1>
          </div>
        </Link>
        <OrganizationSelector />

        {organizationId && (
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Invite Member
          </button>
        )}

        <div>
          <div>test@test.com</div>
          <div>OWNER</div>
        </div>
      </aside>

      {organizationId && (
        <InviteMemberModal
          organizationId={organizationId}
          isOpen={isInviteModalOpen}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar
