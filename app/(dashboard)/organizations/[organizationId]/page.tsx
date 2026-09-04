import NoProjects from '@/app/components/NoProjects'
import { apiServer } from '@/app/lib/api/api-server'
import { getProjects } from '@/app/lib/api/projects'
import { redirect } from 'next/navigation'

const OrganizationPage = async ({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) => {
  const { organizationId } = await params

  const projects = await getProjects(apiServer, organizationId)

  if (!projects.length) {
    return <NoProjects />
  }

  redirect(`/organizations/${organizationId}/projects/${projects[0].id}`)
}

export default OrganizationPage
