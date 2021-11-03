import { Injectable } from '@nestjs/common';
import { CreateCancerTypeDto } from './dto/create-cancer-type.dto';
import { UpdateCancerTypeDto } from './dto/update-cancer-type.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CancerType} from "./schemas/cancer-type.schema";

@Injectable()
export class CancerTypesService {
  constructor(@InjectModel(CancerType.name) private cancerTypeModel: Model<CancerType>) {}

  create(createCancerTypeDto: CreateCancerTypeDto) {
    const createdCat = new this.cancerTypeModel(createCancerTypeDto);
    return createdCat.save();
  }

  findAll() {
    return this.cancerTypeModel.find().exec();
  }

  findOne(id: number) {
    return this.cancerTypeModel.findOne({id});
  }

  update(id: number, cancerType: CancerType) {
    return this.cancerTypeModel.findByIdAndUpdate(id, cancerType);
  }

  remove(id: number) {
    return `This action removes a #${id} cancerType`;
  }
}
