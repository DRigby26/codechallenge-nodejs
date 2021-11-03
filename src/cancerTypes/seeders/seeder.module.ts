import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {SeederService} from "./seeder.service";
import {CancerType, CancerTypeSchema} from "../schemas/CancerType.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: CancerType.name, schema: CancerTypeSchema }])],
    providers: [SeederService]
})

export class SeederModule {}