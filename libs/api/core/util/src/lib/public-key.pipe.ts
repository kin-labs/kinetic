import { PublicKey } from '@solana/web3.js'

import { PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common'

@Injectable()
export class PublicKeyPipe implements PipeTransform {
  constructor(private readonly field: string) {}

  transform(value: string) {
    try {
      new PublicKey(value)
    } catch (error) {
      throw new HttpException(`${this.field} must be a valid PublicKey`, HttpStatus.BAD_REQUEST)
    }

    return value
  }
}
