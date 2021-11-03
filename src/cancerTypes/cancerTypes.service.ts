import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {CancerType} from "./schemas/CancerType.schema";
import {seedDB} from "./seeders/data";

@Injectable()
export class CancerTypesService {
  constructor(@InjectModel(CancerType.name) private cancerTypeModel: Model<CancerType>) {}

  // async create(createCatDto: CreateCatDto): Promise<Cat> {
  //   const createdCat = new this.catModel(createCatDto);
  //   return createdCat.save();
  // }

  // async findAll(): Promise<Cat[]> {
  //   return this.catModel.find().exec();
  // }


}
