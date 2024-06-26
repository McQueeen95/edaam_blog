import { Controller, Get ,Param,HttpException,HttpStatus } from '@nestjs/common';
import { GoogleDrivePhotosService } from './google-drive-photos.service';

@Controller('palestinePhotos') //http://localhost:3000/palestinePhotos/getRandomPhoto/:folderId
export class GoogleDrivePhotosController {
  constructor(private readonly googleDrivePhotosService: GoogleDrivePhotosService) {}

  @Get('getRandomPhoto/:folderId')
  async getRandomPhoto(@Param('folderId') folderId:string){
    try{
      const photoUrl = await this.googleDrivePhotosService.getRandomPhoto(folderId);
      return {message: photoUrl , statusCode: 200 , status: 'success'};
    }catch(error){
      throw new HttpException(error.message,HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
