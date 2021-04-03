import { HashService } from './../../common/services/hash.service';
import { AuthService } from './../auth/auth.service';

import { LocalStrategy } from './../../common/strategies/local.strategy';
import { JwtStrategy } from './../../common/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { Agenda, AgendaSchema } from './schemas/agenda.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schemas/user.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Agenda.name, schema: AgendaSchema }, { name: User.name, schema: UserSchema }]),
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  })],
  controllers: [AgendaController],
  providers: [AgendaService, AuthService, UserService, HashService, JwtStrategy, LocalStrategy],
})
export class AgendaModule {}