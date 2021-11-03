import { Module } from '@nestjs/common';
import { CancerTypesService } from './cancer-types.service';
import { CancerTypesController } from './cancer-types.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {CancerType, CancerTypeSchema} from "./schemas/cancer-type.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: CancerType.name, schema: CancerTypeSchema }])],
  controllers: [CancerTypesController],
  providers: [CancerTypesService]
})
export class CancerTypesModule {}
