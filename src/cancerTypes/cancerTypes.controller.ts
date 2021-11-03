import { Controller, Get } from '@nestjs/common';
import { CancerTypesService } from './cancerTypes.service';

@Controller()
export class CancerTypesController {
  constructor(private readonly cancerTypesService: CancerTypesService) {}

  // @Get()
  // getHello(): string {
  //   return this.cancerTypesService.getHello();
  // }
}
