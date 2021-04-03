

import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import {Document} from 'mongoose';


export type UserDocument = User & Document;


@Schema()
export class User {
    @Prop( { required: true })
    email: string;
    @Prop({ required: true })
    password: string;
    @Prop()
    firstName: string;
    @Prop()
    middleName: string;
    @Prop()
    lastName: string;
    @Prop()
    age: string;
    @Prop() 
    birthDate: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);