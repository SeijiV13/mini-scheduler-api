import { AuthService } from './../auth/auth.service';
import { LocalStrategy } from './../../common/strategies/local.strategy';
import { JwtStrategy } from './../../common/strategies/jwt.strategy';
import { HashService } from './../../common/services/hash.service';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '24h' },
      }),
],
    controllers: [UserController],
    providers: [UserService, HashService, AuthService, JwtStrategy, LocalStrategy]
})
export class UserModule {}
