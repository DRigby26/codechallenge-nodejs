import {CopingMethod, ProtectiveFactor, RiskFactor, ScreeningMethod, Treatment} from "../interfaces";


export class CreateCancerTypeDto {
    name: string;
    overview: string;
    riskFactors: RiskFactor[];
    protectiveFactors: ProtectiveFactor[];
    screeningMethods: ScreeningMethod[];
    copingMethods: CopingMethod[];
    treatments: Treatment[];
}