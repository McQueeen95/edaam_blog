import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { Blog } from '@prisma/client';

@Injectable()
export class BlogsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async addBlog(createBlogDto: Prisma.BlogCreateInput) {
    return this.databaseService.blog.create({ data: createBlogDto });
  }

  async getAllBlogs() {
    return this.databaseService.blog.findMany();
  }
  async getAllBlogsDesc() {
    return this.databaseService.blog.findMany({where: {Post_date:'desc'}}); // from latest to oldest articles
  }
  async getAllBlogsAsc() {
    return this.databaseService.blog.findMany({where: {Post_date:'asc'}}); // from oldest to latest articles
  }
  async getBlogById(Article_id: string) {
    return this.databaseService.blog.findUnique({ where: { Article_id } }); // where takes the name of the column , if not the name of the column we write it as {columnName: variable}
  }

  async updateBlog(Article_id: string, updateBlogDto: Prisma.BlogUpdateInput) {
    return this.databaseService.blog.update({
      where: { Article_id },
      data: updateBlogDto,
    });
  }

  async deleteBlog(Article_id: string) {
    return this.databaseService.blog.delete({ where: { Article_id } });
  }
}
