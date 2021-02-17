import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { FriendsGateway } from './friends.gateway';
import { GamesGateway } from './games.gateway';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/godb'), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, FriendsGateway, GamesGateway],
})
export class AppModule {}
