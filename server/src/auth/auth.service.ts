import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    try {
      const hashedPassword = await argon2.hash(dto.password);
      // const user = await this.prisma.user.create({
      //   data: {
      //     email: dto.email,
      //     password: hashedPassword,
      //     username: dto.username,
      //   },
      // });
    } catch (e) {
      console.log(e);
    }
    return 'signup';
  }

  login() {
    return 'login';
  }

  logout() {
    return 'logout';
  }

  refreshTokens() {
    return 'refreshToken';
  }
}
