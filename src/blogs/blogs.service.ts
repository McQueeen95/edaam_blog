import { Injectable , NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ImageUploadService } from 'src/image-upload/image-upload.service';

@Injectable()
export class BlogsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly imageUploadService: ImageUploadService
    ) {}
  async addBlog(createBlogDto: Prisma.blogCreateInput, image?: Express.Multer.File) {
    if(image){
      const imageUrl = await this.imageUploadService.uploadImage(image);
      const blogData = {
        ...createBlogDto,
        image: imageUrl,
      };
      return await this.databaseService.blog.create({ data: blogData });
    } else {
      return await this.databaseService.blog.create({ data: createBlogDto });
    }
  }
  async getAllPostsByCategoryIdOrName(Category_id?: string, Category_name_AR?: string, Category_name_EN?: string) {
    if(Category_id || Category_name_AR || Category_name_EN){
      return await this.databaseService.blog.findMany({
        where: {
          OR: [
            { Category_id },
            { category: 
              { 
                OR: [
                  { Category_name_AR }, 
                  { Category_name_EN }
                ] 
              } 
            },
          ],
        },
      })
    }else{
      return await this.databaseService.blog.findMany();
    }
  }
  async getAllBlogsDesc() {
    return await this.databaseService.blog.findMany({where: {Post_date:'desc'}}); // from latest to oldest articles
  }
  async getAllBlogsAsc() {
    return await this.databaseService.blog.findMany({where: {Post_date:'asc'}}); // from oldest to latest articles
  }
  async getBlogById(Article_id: string) {
    return await this.databaseService.blog.findUnique({ where: { Article_id } }); // where takes the name of the column , if not the name of the column we write it as {columnName: variable}
  }

  async updateBlog(Article_id: string, updateBlogDto: Prisma.blogUpdateInput) {
    return await this.databaseService.blog.update({
      where: { Article_id },
      data: updateBlogDto,
    });
  }

  async deleteBlog(Article_id: string) {
    return await this.databaseService.blog.delete({ where: { Article_id } });
  }
}
