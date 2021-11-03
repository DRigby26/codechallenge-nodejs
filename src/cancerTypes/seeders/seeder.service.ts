import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {CancerType} from "../schemas/CancerType.schema";
import {Model} from "mongoose";
import {getCancerTypeData, rootURL, seedDB} from "./data";
import axios from "axios";
import cheerio from "cheerio";
import {CreateCancerTypeDto} from "../dto/createCancerType.dto";
import {ProtectiveFactor, RiskFactor, ScreeningMethod, Treatment} from "../interfaces";


@Injectable()
export class SeederService {
    constructor(@InjectModel(CancerType.name) private cancerTypeModel: Model<CancerType>) {}

    async seed() {
        await seedDB();
    }
}