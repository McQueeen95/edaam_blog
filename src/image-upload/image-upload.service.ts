import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary ,UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  private readonly logger = new Logger(ImageUploadService.name);
  constructor(@Inject('Cloudinary') private cloudinary) {}
  async uploadImage(image: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({resource_type: 'image'},(error, result) => {
        if (error) {
          this.logger.error('Cloudinary upload failed', error);
          reject(error);
        } else {
          resolve(result);
        }
      }).end(image.buffer);
    });
  }
}
