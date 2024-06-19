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
  ////////////
  // imports: [
  //   ConfigModule,
  //   MulterModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       dest: configService.get('D:\\'),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  /////////
  // imports: [
  //   ConfigModule.forRoot({
  //     isGlobal: true,
  //   }),
  //   MulterModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: async (configService: ConfigService) => ({
  //       storage: multer.diskStorage({
  //         destination: (req, file, cb) => {
  //           const uploadPath = configService.get('IMAGE_UPLOAD_PATH');
  //           cb(null, uploadPath);
  //         },
  //         filename: (req, file, cb) => {
  //           const randomName = Array.from({ length: 10 }, () =>
  //             Math.floor(Math.random() * 36).toString(36),
  //           ).join('');
  //           const filename = `${randomName}-${Date.now()}-${file.originalname}`;
  //           cb(null, filename);
  //         },
  //       }),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  ////////////
  // imports:[
  //   ConfigModule,
  //   MulterModule.registerAsync({
  //     imports: [ConfigModule],
  //     useFactory: (configService: ConfigService) => ({
  //       storage: multer.memoryStorage(),
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  providers: [CloudinaryProvider, ImageUploadService],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
