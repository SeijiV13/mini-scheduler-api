
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import {Document} from 'mongoose';
export type CheckListDocument = CheckList & Document;


@Schema()
export class CheckList {
    @Prop()
    description: string;

}

export const AgendaSchema = SchemaFactory.createForClass(CheckList);