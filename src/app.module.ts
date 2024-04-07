import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BlogsModule } from './blogs/blogs.module';
import { BlogCategoriesModule } from './blog_categories/blog_categories.module';

@Module({
  imports: [BlogsModule, DatabaseModule, BlogsModule, BlogCategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
