import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScreeningMethod extends Document {
    @Prop()
    method: string;

    @Prop({default(val: any): any {return false}})
    isDeleted?: boolean;
}

export const ScreeningMethodSchema = SchemaFactory.createForClass(ScreeningMethod);