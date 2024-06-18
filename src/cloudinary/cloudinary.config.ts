import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => {
    // const cloudName = configService.get('dqadu6evf');
    // const apiKey = configService.get('866538179325257');
    // const apiSecret = configService.get('mAhIWXJ3fK7mR5WeT5zUHMyQvwc');
    cloudinary.config({
      cloud_name: 'dqadu6evf',
      api_key: '866538179325257',
      api_secret: 'mAhIWXJ3fK7mR5WeT5zUHMyQvwc',
      secure: true
    });
    return cloudinary;
  },
  inject: [ConfigService],
};

