import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {CopingMethod} from "./CopingMethod.schema";
import {ScreeningMethod} from "./SceeningMethod.schema";
import {RiskFactor} from "./RiskFactor.schema";
import {ProtectiveFactor} from "./ProtectiveFactor.schema";
import {Treatment} from "./Treatment.schema";


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
