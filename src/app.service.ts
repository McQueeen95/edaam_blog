import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getMessage(route: string): string {
    if(route !== '/'){
      return 'Wrong route';
    }
  }
}
