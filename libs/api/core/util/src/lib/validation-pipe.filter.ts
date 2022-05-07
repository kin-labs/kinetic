import Joi = require('joi')
import { PublicKey } from '@solana/web3.js'

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { ObjectSchema } from 'joi'

// we can keep adding schemaTypes
enum SchemaType {
  AccountIdSchema = 'AccountIdSchema',
}

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: string) {
    if (this.schema._flags?.id) {
      switch (this.schema._flags?.id) {
        case SchemaType.AccountIdSchema:
          return validateAccountIdSchema(value)
        default:
          break
      }
    }

    return value
  }
}

export const AccountIdSchema = Joi.object({
  accountId: Joi.string().required(),
}).id(SchemaType.AccountIdSchema)

function validateAccountIdSchema(value: string): string {
  try {
    new PublicKey(value)
  } catch (error) {
    throw new BadRequestException('accountId must be a valid PublicKey')
  }
  return value
}
