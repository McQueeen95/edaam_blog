import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ImageUploadService } from './image-upload.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.config';
import * as multer from 'multer';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: +configService.get<number>(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
        },
        fileFilter: (req, file, cb) => {
          const allowedTypes = /jpeg|jpg|png|gif/;
          const mimeType = allowedTypes.test(file.mimetype);
          const extName = allowedTypes.test(extname(file.originalname).toLowerCase());

          if (mimeType && extName) {
            return cb(null, true);
          } else {
            cb(new Error('Invalid file type'), false);
          }
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CloudinaryProvider, ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
