import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

interface User {
  id: number;
  email: string;
  password: string;
}
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const user: User = await this.userService.findOne(loginDto.email);
    // const isMatch = await bcrypt.compare(password, hash);
    if (user?.password !== loginDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...userData } = user;
    
    return userData;
  }
}
