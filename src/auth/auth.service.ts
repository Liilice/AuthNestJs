import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: number;
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const user: User = await this.userService.findOne(loginDto.email);
    // const isMatch = await bcrypt.compare(password, hash);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
    const refreshToken = {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    };
    return { accessToken, refreshToken };
  }

  async verifyRefreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
