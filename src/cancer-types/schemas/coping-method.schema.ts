import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class CopingMethod extends Document {
    @Prop()
    method: string;

    @Prop({default(val: any): any {return false}})
    isDeleted?: boolean;
}

export const CopingMethodSchema = SchemaFactory.createForClass(CopingMethod);