import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/config.service';
import { ConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RedisModule } from './redis/redis.module';
import { REDIS } from './redis/redis.constants';
import { RedisClient } from 'redis';

@Module({
  imports: [
    RedisModule,
    AuthModule,
    UsersModule,
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new Promise((resolve, reject) => {
          (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(configService.getMongoConfig());
            }
          };
        }),
    }),
  ],
  providers: [AppService, Logger],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(@Inject(REDIS) private readonly redis: RedisClient) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: 'sup3rs3cr3t',
          resave: false,
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 60000,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
