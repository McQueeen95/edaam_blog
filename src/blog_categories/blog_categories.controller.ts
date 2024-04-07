import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogCategoriesService } from './blog_categories.service';
import { Prisma } from '@prisma/client';
import { CreateBlogCategoryDto } from './dto/create-blog_category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog_category.dto';

@Controller('blogCategory') // /blogCategory    #here we start our route as (http://localhost:3000/blogCategory) 
export class BlogCategoriesController {
  constructor(private readonly blogCategoriesService: BlogCategoriesService) {}

  @Post('addCategory') // this is POST with no params as http://localhost:3000/blogCategory/addCategory that creates a category
  addCategory(@Body() createBlogCategoryDto: Prisma.blog_categoryCreateInput) {
    return this.blogCategoriesService.addBlogCategory(createBlogCategoryDto)
  }

  @Get('getAllCategories') // this is GET  http://localhost:3000/blogCategory/getAllCategories that gets all categories
  getAllCategories() {
    return this.blogCategoriesService.getAllBlogCategories()
  }

  @Get('getCategoryById/:id') // this is GET with params (id) as http://localhost:3000/blogCategory/getCategoryById/:id that gets one category
  getCategoryById(@Param('id') id: string) {
    return this.blogCategoriesService.getBlogCategoryById(id)
  }

  @Patch('updateCategory/:id') // this is PATCH with params (id) as http://localhost:3000/blogCategory/updateCategory/:id that updates a category
  updateCategory(@Param('id') id: string, @Body() updateBlogCategoryDto: Prisma.blog_categoryUpdateInput) {
    return this.blogCategoriesService.updateBlogCategory(id, updateBlogCategoryDto)
  }

  @Delete('deleteCategory/:id') // this is DELETE with params (id) as http://localhost:3000/blogCategory/deleteCategory/:id that deletes a category
  deleteCategory(@Param('id') id: string) {
    return this.blogCategoriesService.deleteBlogCategoryById(id)
  }
}
