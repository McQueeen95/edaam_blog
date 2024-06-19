import { Injectable, Inject, Logger, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary ,UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

@Injectable()
export class ImageUploadService {
  private readonly logger = new Logger(ImageUploadService.name);
  constructor(@Inject('Cloudinary') private cloudinary) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (!file) {
      this.logger.error('No file provided');
      throw new BadRequestException('No file provided');
    }

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) {
          this.logger.error('Cloudinary upload failed', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
      uploadStream.end(file.buffer);
    });
  }
}
