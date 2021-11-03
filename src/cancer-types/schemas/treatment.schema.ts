import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Treatment extends Document {
    @Prop()
    methods: string;

    @Prop({default(val: any): any {return false}})
    isDeleted?: boolean;
}

export const TreatmentSchema = SchemaFactory.createForClass(Treatment);