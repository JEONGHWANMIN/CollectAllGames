import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthLogInDto, AuthSignUpDto } from './dto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: AuthSignUpDto): Promise<Tokens> {
    const hashedPassword = await argon2.hash(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        username: dto.username,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.username,
    );

    await this.updateRtHash(newUser.id, tokens.refreshToken);

    return tokens;
  }

  login(dto: AuthLogInDto) {
    console.log(dto);
    return 'login';
  }

  logout() {
    return 'logout';
  }

  refreshTokens() {
    return 'refreshToken';
  }

  async getTokens(
    userId: number,
    email: string,
    username: string,
  ): Promise<Tokens> {
    const payload = {
      userId,
      email,
      username,
    };

    const atOptions = {
      expiresIn: 60 * 15,
      secret: 'at-secret',
    };

    const rtOptions = {
      expiresIn: 60 * 60 * 24 * 7,
      secret: 'rt-secret',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, atOptions),
      this.jwtService.signAsync(payload, rtOptions),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRtHash(userId: number, refreshToken: string) {
    const hash = await argon2.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }
}
