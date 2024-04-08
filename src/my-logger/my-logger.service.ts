import { Injectable, ConsoleLogger } from '@nestjs/common';


@Injectable()
export class MyLoggerService extends ConsoleLogger{
  log(message: any, context?: string) {
    super.log(message, context);
  }
  error(message: any, stackOrContext?: string) {
    super.error(message, stackOrContext);
  }
}
