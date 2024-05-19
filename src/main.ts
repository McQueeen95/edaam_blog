import { NestFactory , HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet  from 'helmet';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    );
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // commented for now
  app.enableCors({
    origin: /(https?:\/\/(?:localhost:\d+|www\.mysite\.com))\/?$/ , // allow http://localhost:XXXX or http://www.mysite.com
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
  // app.enableCors({
  //   origin: function(origin, callback) {
  //     if (origin === 'http://localhost:3000' || origin === 'https://www.mysite.com' || !origin) {
  //       return callback(null, true);
  //     }
  //     return callback(new Error('Not allowed by CORS'));
  //   },
  // })

  app.use(helmet());
  await app.listen(3000, '127.0.0.1', () => {
    console.log(`Application is running on: http://${app.getHttpServer().address().address}:${app.getHttpServer().address().port}`);
  });
}
bootstrap();
