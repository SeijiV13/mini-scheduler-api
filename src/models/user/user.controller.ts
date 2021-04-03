import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
    
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get(":email")
    getUserByName(@Param() param) {
        return this.userService.getUserByEmail(param.email);
    }
    @Post()
    registerUser(@Body() createUserDto: CreateUserDto) {
       let user = new CreateUserDto();
       Object.assign(user, createUserDto);
       return this.userService.registerUser(user);
    }
}
