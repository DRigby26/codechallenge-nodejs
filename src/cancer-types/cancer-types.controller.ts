import {Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus} from '@nestjs/common';
import { CancerTypesService } from './cancer-types.service';
import { CreateCancerTypeDto } from './dto/create-cancer-type.dto';
import { UpdateCancerTypeDto } from './dto/update-cancer-type.dto';
import {CancerType} from "./schemas/cancer-type.schema";

@Controller({version: ['1'], path: 'cancer-types'})
export class CancerTypesController {
  constructor(private readonly cancerTypesService: CancerTypesService) {}

  @Post()
  async create(@Res() response, @Body() createCancerTypeDto: CreateCancerTypeDto) {
    const newCancerType = await this.cancerTypesService.create(createCancerTypeDto);
    return response.status(HttpStatus.CREATED).json({newCancerType});
  }

  // @Post(':id/treatments')
  // async createNewTreatment(@Res() response, @Param('id') id: string, @Body() treatment: string) {
  //   const cancerType = await this.cancerTypesService.findOne(+id);
  //   cancerType.treatments.push(treatment);
  //   return response.status(HttpStatus.OK).json({treatment})
  // }

  @Get()
  async findAll(@Res() response) {
    const cancerTypes = await this.cancerTypesService.findAll();
    return response.status(HttpStatus.OK).json({cancerTypes});
  }

  @Get(':id/overview')
  async getCancerTypeSummary(@Res() response, @Param('id') id: string) {
    const cancerType = await this.cancerTypesService.findOne(+id);
    return response.status(HttpStatus.OK).json({summary: cancerType.overview});
  }

  @Get(':id/treatments')
  async getCancerTreatments(@Res() response, @Param('id') id: string) {
    const cancerType = await this.cancerTypesService.findOne(+id);
    return response.status(HttpStatus.OK).json({summary: cancerType.treatments});
  }

  @Get(':id/causes-preventions')
  async getCausesAndPreventions(@Res() response, @Param('id') id: string) {
    const cancerType = await this.cancerTypesService.findOne(+id);
    return response.status(HttpStatus.OK).json({summary: cancerType.overview});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() cancerType: CancerType) {
    return this.cancerTypesService.update(+id, cancerType);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancerTypesService.remove(+id);
  }
}
