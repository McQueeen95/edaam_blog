import { Controller, Get ,Param } from '@nestjs/common';
import { GoogleDrivePhotosService } from './google-drive-photos.service';

@Controller('palestinePhotos') //http://localhost:3000/palestinePhotos/getRandomPhoto/:folderId
export class GoogleDrivePhotosController {
  constructor(private readonly googleDrivePhotosService: GoogleDrivePhotosService) {}

  @Get('getRandomPhoto/:folderId')
  async getRandomPhoto(@Param('folderId') folderId:string): Promise<string> {
    return this.googleDrivePhotosService.getRandomPhoto(folderId);
  }
}
