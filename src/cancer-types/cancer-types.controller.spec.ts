import { Test, TestingModule } from '@nestjs/testing';
import { CancerTypesController } from './cancer-types.controller';
import { CancerTypesService } from './cancer-types.service';

describe('CancerTypesController', () => {
  let controller: CancerTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CancerTypesController],
      providers: [CancerTypesService],
    }).compile();

    controller = module.get<CancerTypesController>(CancerTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
