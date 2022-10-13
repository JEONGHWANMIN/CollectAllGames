import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthLogInDto, AuthSignUpDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthSignUpDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('/login')
  login(@Body() dto: AuthLogInDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @Post('/logout')
  logout(@GetCurrentUser('userId') userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh-tokens')
  refreshTokens(
    @GetCurrentUser('userId') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
