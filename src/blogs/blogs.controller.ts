import { Controller, Get, Post, Body, Patch, Param, Delete , Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { Prisma } from '@prisma/client';


@Controller('blog') // /blog    #here we start our route as (http://localhost:3000/blog) by work "blog"
// the order of this controllers are important
/*
As we can see here if we put @Get('id')( http://localhost:3000/blog/:id ) before @Get('getAllBLogs')(http://localhost:3000/blog/getAllBLogs)
it gonna assign the ':id' params to getAllBLogs { "id": "getAllBLogs" } => so we must consider the order here and not put @Get('getAllBLogs') after @Get('id')
! so if we had specific static routes like (/blog/getblog) that will need to be before the dynamic routes that accept id params like (/blog/:id)
or we can make special routes to avoid this

/blog/getAllBLogs?category=value called query params we can add additional params like ?Date=value

* to Validate we use pipes, after we import it we pass it with the params as : @Param('id',ParseIntPipe)
*/

export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  /*
  GET /blog/getAllBLogs or /blog/getAllBLogs?category=value (done)
  GET /blog/getBlogByID/:id (done)
  POST /blog/addBlog (done)
  PUT-PATCH /blog/updateBlog/:id (done)
  DELETE /blog/deleteBlog/:id (done)
  ! done making the routes working
  */

  @Post('addPost') // this is POST with no params as http://localhost:3000/blog/addPost that creates a blog
  addBlog(@Body() createBlogDto: Prisma.blogCreateInput) {
    return this.blogsService.addBlog(createBlogDto);
  }

  @Get('getAllPosts') // this is GET  http://localhost:3000/blog/getAllPosts that gets all blogs 
  //! @ this decorator it means this is a GET method with key and value
  getAllBlogs(){ // '?' means that this param is optional
    return this.blogsService.getAllBlogs()
  }

  @Get('getAllPostsDesc') // this is GET with params as http://localhost:3000/blog/getAllPostsDesc that gets all blogs in descending order
  getAllBlogsDesc(){
    return this.blogsService.getAllBlogsDesc()
  }

  @Get('getAllPostsAsc') // this is GET with params as http://localhost:3000/blog/getAllPostsAsc that gets all blogs in ascending order
  getAllBlogsAsc(){
    return this.blogsService.getAllBlogsAsc()
  }

  @Get('getPostByID/:id') // this is GET with params (id) as http://localhost:3000/blog/getPostByID/:id that gets one blog
  getBlogByID(@Param('id') id: string){
    return this.blogsService.getBlogById(id)
  }

  @Patch('updatePost/:id') // this is PATCH with params (id) as http://localhost:3000/blog/updatePost/:id that updates a blog
  updateBlog(@Param('id') id: string, @Body() updateBlogDto: Prisma.blogUpdateInput){
    return this.blogsService.updateBlog(id, updateBlogDto)
  }

  @Delete('deletePost/:id') // this is DELETE with params (id) as http://localhost:3000/blog/deletePost/:id that deletes a blog
  deleteBlog(@Param('id') id: string){
    return this.blogsService.deleteBlog(id)
  }
}
