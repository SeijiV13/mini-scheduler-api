
import * as mongoose from 'mongoose';
import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import {Document} from 'mongoose';
import { CheckList } from "./checklist.schema";
export type AgendaDocument = Agenda & Document;


@Schema()
export class Agenda {
    @Prop({required: true})
    user: string;
    @Prop({required: true})
    date:string;
    @Prop({ required: true, maxlength: 30})
    title: string;
    @Prop()
    description: string;
    @Prop({ default: false})
    highPriority: boolean;
    @Prop( { default: false})
    done: boolean;
    @Prop({ type: mongoose.Schema.Types.Array, ref: 'CheckList'})
    checkList: CheckList[];

}

export const AgendaSchema = SchemaFactory.createForClass(Agenda);