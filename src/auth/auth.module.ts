import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';
dotenv.config();
@Module({
  imports: [UsersModule, JwtModule.register({ global: true , secret: process.env.JWT_SECRET})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
