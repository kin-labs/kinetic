import { Injectable } from '@nestjs/common'
import { AccountInfoResponse } from './entities/account-info.entity'
import { CreateAccountResponse } from './entities/create-account.entity'

@Injectable()
export class ApiAccountDataAccessService {
  getAccountInfo(): AccountInfoResponse {
    return {}
  }

  createAccount(): CreateAccountResponse {
    return {}
  }

  resolveTokenAccounts() {
    return {}
  }
}
