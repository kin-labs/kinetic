import { UserRole } from '@prisma/client'

export function getAuthUsers(users = '') {
  return users.split(',').map((user) => {
    const [username, password, role, email, avatarUrl] = user.split('|')

    return {
      username,
      // We won't provision passwords shorter than 8 characters
      password: password?.length < 8 ? undefined : password,
      role: (role ?? UserRole.User) as UserRole,
      avatarUrl,
      email,
    }
  })
}
