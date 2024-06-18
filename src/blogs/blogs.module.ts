import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ImageUploadModule } from 'src/image-upload/image-upload.module';

@Module({
  imports: [DatabaseModule, ImageUploadModule],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
