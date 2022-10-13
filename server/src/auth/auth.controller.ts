import { Body, Controller, Post } from '@nestjs/common';
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
  login(@Body() dto: AuthLogInDto) {
    return this.authService.login(dto);
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/refresh-tokens')
  refreshTokens() {
    return this.authService.refreshTokens();
  }
}
