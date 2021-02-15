import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/godb'), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
