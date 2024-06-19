import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello():Promise<string> {
    return await 'Hello World!';
  }

  async getMessage(route: string):Promise<string> {
    if(route !== '/'){
      return await 'Wrong route';
    }
  }
}
