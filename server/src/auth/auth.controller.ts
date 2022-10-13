import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthLogInDto, AuthSignUpDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: AuthSignUpDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Post('/login')
  login(@Body() dto: AuthLogInDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout(@Req() req: Request) {
    const user = req.user;
    return this.authService.logout(user['userId']);
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh-tokens')
  refreshTokens(@Req() req: Request) {
    const user = req.user;
    return this.authService.refreshTokens(user['userId'], user['refreshToken']);
  }
}
