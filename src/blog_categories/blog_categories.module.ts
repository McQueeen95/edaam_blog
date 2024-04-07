import { Module } from '@nestjs/common';
import { BlogCategoriesService } from './blog_categories.service';
import { BlogCategoriesController } from './blog_categories.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogCategoriesController],
  providers: [BlogCategoriesService],
})
export class BlogCategoriesModule {}
