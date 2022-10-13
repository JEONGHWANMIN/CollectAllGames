import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Post('/login')
  login() {
    return this.authService.login();
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
