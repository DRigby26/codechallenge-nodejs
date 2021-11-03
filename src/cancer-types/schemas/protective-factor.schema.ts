import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProtectiveFactor extends Document {
    @Prop()
    factor: string;

    @Prop({default(val: any): any {return false}})
    isDeleted?: boolean;
}

export const ProtectiveFactorSchema = SchemaFactory.createForClass(ProtectiveFactor);