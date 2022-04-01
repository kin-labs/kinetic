import { ApiCoreDataAccessService } from '@mogami/api/core/data-access'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { AppCreateInput } from './dto/app-create.input'
import { AppUpdateInput } from './dto/app-update.input'

@Injectable()
export class ApiAppDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async createApp(userId: string, data: AppCreateInput) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.getAppByIndex(data.index)
    if (app) {
      throw new BadRequestException(`App with index ${data.index} already exists`)
    }
    return this.data.app.create({ data })
  }

  async deleteApp(userId: string, appId: string) {
    await this.ensureAppById(userId, appId)
    return this.data.app.delete({ where: { id: appId } })
  }

  async apps(userId: string) {
    await this.data.ensureAdminUser(userId)
    return this.data.app.findMany()
  }

  async app(userId: string, appId: string) {
    return this.ensureAppById(userId, appId)
  }

  async updateApp(userId: string, appId: string, data: AppUpdateInput) {
    await this.ensureAppById(userId, appId)
    return this.data.app.update({ where: { id: appId }, data })
  }

  private async ensureAppById(userId: string, appId: string) {
    await this.data.ensureAdminUser(userId)
    const app = await this.data.app.findUnique({ where: { id: appId } })
    if (!app) {
      throw new NotFoundException(`App with id ${appId} does not exist.`)
    }
    return app
  }
}
