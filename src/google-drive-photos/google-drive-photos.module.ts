import { Module } from '@nestjs/common';
import { GoogleDrivePhotosService } from './google-drive-photos.service';
import { GoogleDrivePhotosController } from './google-drive-photos.controller';

@Module({
  controllers: [GoogleDrivePhotosController],
  providers: [GoogleDrivePhotosService],
})
export class GoogleDrivePhotosModule {}
