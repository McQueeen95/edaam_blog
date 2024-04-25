import { NestFactory , HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet  from 'helmet';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
    );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  
  app.enableCors();

  // app.enableCors({
  //   origin: /(https?:\/\/(?:localhost:\d+|www\.mysite\.com))\/?$/ , // allow http://localhost:XXXX or http://www.mysite.com
  //   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  // })
  // app.enableCors({
  //   origin: function(origin, callback) {
  //     if (origin === 'http://localhost:3000' || origin === 'https://www.mysite.com' || !origin) {
  //       return callback(null, true);
  //     }
  //     return callback(new Error('Not allowed by CORS'));
  //   },
  // })

  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
