import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AgendaController } from './models/agenda/agenda.controller';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendaModule } from './models/agenda/agenda.module';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';
import { HashService } from './common/services/hash.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.l1zps.mongodb.net/minisdb?retryWrites=true&w=majority'),
   AgendaModule,
   AuthModule,
   UserModule
],
  controllers: [AppController],
  providers: [AppService, HashService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(AgendaController);
  }
}
