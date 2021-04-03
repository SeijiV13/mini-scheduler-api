import { HashService } from './../../common/services/hash.service';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { validate } from 'class-validator';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) {}

    async getUserByEmail(email: string) {
      return  this.userModel.findOne({ email }).exec();
    }

    async registerUser(createUserDto: CreateUserDto) {
        // validate DTO
        const errors = await validate(createUserDto);
        if(errors.length > 0) {
            return errors;
        }
    
        const createUser = new this.userModel(createUserDto);
        // check if user exists
        const user = await this.getUserByEmail(createUser.email);
        if(user) {
            throw new BadRequestException();
        }
        console.log(user);
        // Hash Password
        createUser.password = await this.hashService.hashPassword(createUser.password); 

        return createUser.save();
    }


}
