import { Injectable, Inject, Logger } from '@nestjs/common';
import { v2 as cloudinary ,UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  private readonly logger = new Logger(ImageUploadService.name);
  constructor(@Inject('Cloudinary') private cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          this.logger.error('Cloudinary upload failded: ', error);
          reject(error);
        }
        else {
          resolve(result);
        }
      });
      if(!file){
        const error = new Error('No file provided');
        this.logger.error('No file provided: ', error);
        reject(error);
      }
      else {
        uploadStream.end(file.buffer);
      }
    });
  }
}
