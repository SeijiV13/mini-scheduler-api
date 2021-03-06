import { HashService } from './../../common/services/hash.service';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, 
        private hashService: HashService,
        private jwtService: JwtService) {}


    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmail(email);
        if (user && await this.hashService.comparePassword(pass, user.password)) {
          return user;
        }
        return null;
      }


    async login(user: any) {
        const payload = { username: user.email, sub: user.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

   async decodeJwt(jwt) {
        return await  this.jwtService.decode(jwt);
    }

   async extractUser(header) {
    const jwtArray = header.authorization.split(" ");
    const jwt = jwtArray[1];

    return await this.decodeJwt(jwt);
   }
}
