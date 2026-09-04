import { redirect } from 'next/navigation'
import NoOrganizations from '../components/NoOrganizations'
import { getOrganizations } from '../lib/api/organizations'
import { getProjects } from '../lib/api/projects'
import { apiServer } from '../lib/api/api-server'

const DashboardPage = async () => {
  const organizations = await getOrganizations(apiServer)
  if (!organizations.length) return <NoOrganizations />
  const firstOrganization = organizations[0]
  const projects = await getProjects(apiServer, firstOrganization.id)
  if (!projects.length) {
    redirect(`/organizations/${firstOrganization.id}`)
  }
  const firstProject = projects[0]

  redirect(`/organizations/${firstOrganization.id}/projects/${firstProject.id}`)
}

export default DashboardPage
