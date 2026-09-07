import type { OrganizationRole } from '@/app/types/enums'

const WORKSPACE_MANAGE_ROLES: OrganizationRole[] = ['OWNER', 'ADMIN', 'MANAGER']

export function canManageWorkspace(role?: OrganizationRole): boolean {
  return !!role && WORKSPACE_MANAGE_ROLES.includes(role)
}
