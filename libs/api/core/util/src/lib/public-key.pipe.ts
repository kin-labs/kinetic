import { HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { PublicKey } from '@solana/web3.js'

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
