import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class RiskFactor extends Document {
    @Prop()
    factor: string;

    @Prop({default(val: any): any {return false}})
    isDeleted?: boolean;
}

export const RiskFactorSchema = SchemaFactory.createForClass(RiskFactor);