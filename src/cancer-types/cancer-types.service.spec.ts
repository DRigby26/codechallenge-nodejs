import { Test, TestingModule } from '@nestjs/testing';
import { CancerTypesService } from './cancer-types.service';

describe('CancerTypesService', () => {
  let service: CancerTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancerTypesService],
    }).compile();

    service = module.get<CancerTypesService>(CancerTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
