import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './utils/local.strategy';
import { AuthSerializer } from './providers/serialization.provider';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
