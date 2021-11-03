import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {SeederModule} from "./seeder.module";

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017'),
        SeederModule
    ]
})
export class AppModule {}