import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './blogs/blogs.module';
import { BlogCategoriesModule } from './blog_categories/blog_categories.module';
import { ThrottlerModule , ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { GoogleDrivePhotosModule } from './google-drive-photos/google-drive-photos.module';
import { CloudinaryProvider } from './cloudinary/cloudinary.config';
import { ImageUploadService } from './image-upload/image-upload.service';
import { ImageUploadModule } from './image-upload/image-upload.module';


@Module({
  imports: [
    DatabaseModule, 
    BlogsModule, 
    BlogCategoriesModule,
    ThrottlerModule.forRoot([
    {
      name: 'light',
      ttl: 10000,         // time to live in milliseconds , so this is 1 second
      limit: 10,         // maximum number of requests allowed per ttl
    },
    {
      name: 'medium',
      ttl: 30000,         // time to live in milliseconds , so this is 30 second
      limit: 200,         // maximum number of requests allowed per ttl
    },{
      name: 'long',
      ttl: 60000,         // time to live in milliseconds , so this is 1 minute
      limit: 500,         // maximum number of requests allowed per ttl
    }]),
    MyLoggerModule,
    GoogleDrivePhotosModule,
    ConfigModule.forRoot(),
    ImageUploadModule,
  ],
  controllers: [AppController],
  providers: [CloudinaryProvider,AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }, ImageUploadService],
  exports:[
    CloudinaryProvider,
  ]
})
export class AppModule {}
