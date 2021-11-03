import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {CancerType, CancerTypeSchema} from "./schemas/CancerType.schema";
import {CancerTypesController} from "./cancerTypes.controller";
import {CancerTypesService} from "./cancerTypes.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: CancerType.name, schema: CancerTypeSchema }])],
    controllers: [CancerTypesController],
    providers: [CancerTypesService],
})
export class CancerTypesModule {}