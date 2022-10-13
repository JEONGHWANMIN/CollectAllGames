import { ForbiddenException, Injectable } from '@nestjs/common';
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

  async login(dto: AuthLogInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, dto.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Password is not valid');
    }

    const tokens = await this.getTokens(user.id, user.email, user.username);

    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashRt: {
          not: null,
        },
      },
      data: {
        hashRt: null,
      },
    });
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const decodedRt = await argon2.verify(user.hashRt, refreshToken);

    if (!decodedRt) {
      throw new ForbiddenException('Refresh token is not valid');
    }

    const tokens = await this.getTokens(user.id, user.email, user.username);

    await this.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
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
