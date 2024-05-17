import { Test, TestingModule } from '@nestjs/testing';
import { GoogleDrivePhotosService } from './google-drive-photos.service';

describe('GoogleDrivePhotosService', () => {
  let service: GoogleDrivePhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleDrivePhotosService],
    }).compile();

    service = module.get<GoogleDrivePhotosService>(GoogleDrivePhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
