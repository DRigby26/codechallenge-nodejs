import { PartialType } from '@nestjs/mapped-types';
import { CreateCancerTypeDto } from './create-cancer-type.dto';
import {CopingMethod, ProtectiveFactor, RiskFactor, ScreeningMethod, Treatment} from "../interfaces";

export class UpdateCancerTypeDto extends PartialType(CreateCancerTypeDto) {
    name: string;
    overview: string;
    riskFactors: RiskFactor[];
    protectiveFactors: ProtectiveFactor[];
    screeningMethods: ScreeningMethod[];
    copingMethods: CopingMethod[];
    treatments: Treatment[];
}
