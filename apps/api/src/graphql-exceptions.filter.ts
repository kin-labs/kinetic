import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common'
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql'

@Catch(HttpException)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphqlExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    GqlArgumentsHost.create(host)

    this.logger.error(exception)
    return exception
  }
}
