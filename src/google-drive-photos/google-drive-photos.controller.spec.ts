import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDrivePhotosController } from './google-drive-photos.controller';
import { GoogleDrivePhotosService } from './google-drive-photos.service';

describe('GoogleDrivePhotosController', () => {
  let controller: GoogleDrivePhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoogleDrivePhotosController],
      providers: [GoogleDrivePhotosService],
    }).compile();

    controller = module.get<GoogleDrivePhotosController>(GoogleDrivePhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
