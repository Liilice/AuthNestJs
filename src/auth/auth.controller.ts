import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto:LoginDto) {
    return this.authService.signIn(loginDto)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfil(@Request() req){
    return req.user;
  }
}
