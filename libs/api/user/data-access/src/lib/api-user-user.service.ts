import { ApiCoreService } from '@kin-kinetic/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { UserSearchUserInput } from './dto/user-search-user.input'

@Injectable()
export class ApiUserUserService {
  constructor(private readonly core: ApiCoreService) {}

  async userSearchUsers(input: UserSearchUserInput) {
    if (!input.query) {
      return null
    }
    return this.core.user
      .findMany({
        where: {
          OR: [
            { id: { contains: input.query, mode: 'insensitive' } },
            { name: { contains: input.query, mode: 'insensitive' } },
            { username: { contains: input.query, mode: 'insensitive' } },
            { emails: { some: { email: { contains: input.query, mode: 'insensitive' } } } },
          ],
        },
        include: { emails: true },
      })
      .then((users) => {
        return users.map((user) => ({
          ...user,
          password: undefined,
        }))
      })
  }
}
