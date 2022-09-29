import { getAuthUsers } from '@kin-kinetic/api/config/data-access'
import { UserRole } from '@prisma/client'

const users = getAuthUsers(process.env.AUTH_USERS)
const { username, password } = users.find((user) => user.role === UserRole.Admin)

export const ADMIN_USERNAME = username
export const ADMIN_PASSWORD = password
