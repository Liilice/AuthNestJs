import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();
@Module({
  imports: [
    UsersModule,
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET, signOptions: { expiresIn: '15m' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, JwtStrategy],
})
export class AuthModule {}
