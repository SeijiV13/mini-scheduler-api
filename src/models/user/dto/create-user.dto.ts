import { IsEmail, MinLength, MaxLength, IsNumber, IsDate, Matches } from "class-validator";
import { Match } from "src/common/decorators/match-decorator";
import { IsOnlyDate } from "src/common/decorators/date-decorator";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;
    @MinLength(4)
    @MaxLength(20)
    @Match('password', { message: "Password does not match"})
    confirmPassword: string;
    @MaxLength(50)
    firstName: string;
    @MaxLength(50)
    middleName: string;
    @MaxLength(50)
    lastName: string;
    @IsNumber()
    age: string;
    @IsOnlyDate()
    birthDate: string;
}