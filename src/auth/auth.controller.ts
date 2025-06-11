import { Body, Controller, Get, HttpCode,Res, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto:LoginDto) {
    const tokens = await this.authService.signIn(loginDto)

    return { accessToken: tokens.accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfil(@Request() req){
    return req.user;
  }
}
