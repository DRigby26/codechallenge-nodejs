import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {CopingMethod} from "./coping-method.schema";
import {ScreeningMethod} from "./screening-method.schema";
import {RiskFactor} from "./risk-factor.schema";
import {ProtectiveFactor} from "./protective-factor.schema";
import {Treatment} from "./treatment.schema";


@Schema()
export class CancerType extends Document {
    @Prop()
    name: string;

    @Prop()
    overview: string;

    @Prop([RiskFactor])
    riskFactors: RiskFactor[];

    @Prop([ProtectiveFactor])
    protectiveFactors: ProtectiveFactor[];

    @Prop([ScreeningMethod])
    screeningMethods: ScreeningMethod[];

    @Prop([CopingMethod])
    copingMethods: CopingMethod[];

    @Prop([Treatment])
    treatments: Treatment[];
}

export const CancerTypeSchema = SchemaFactory.createForClass(CancerType);
