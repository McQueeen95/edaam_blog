import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BlogCategoriesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async addBlogCategory(createBlogCategoryDto: Prisma.blog_categoryCreateInput) {
    return this.databaseService.blog_category.create({
      data: createBlogCategoryDto,
    });
  }
  async getAllBlogCategories() {
    return this.databaseService.blog_category.findMany();
  }
  async getBlogCategoryById(Id_blog_cat: string) {
    return this.databaseService.blog_category.findUnique({
      where: { Id_blog_cat },
    });
  }
  async updateBlogCategory(Id_blog_cat: string, updateBlogCategoryDto: Prisma.blog_categoryUpdateInput) {
    return this.databaseService.blog_category.update({
      where: { Id_blog_cat },
      data: updateBlogCategoryDto,
    });
  }
  async deleteBlogCategoryById(Id_blog_cat: string) {
    return this.databaseService.blog_category.delete({
      where: { Id_blog_cat },
    });
  }
}
