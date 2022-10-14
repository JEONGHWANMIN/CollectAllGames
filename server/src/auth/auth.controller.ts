import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthLogInDto, AuthSignUpDto } from './dto';
import { Tokens } from './types';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
  ApiTooManyRequestsResponse,
  ApiBody,
} from '@nestjs/swagger';
import { schemas } from './schema';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    status: 201,
    description: '회원가입 완료!',
    schema: schemas.signup,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Post('/signup')
  signup(@Body() dto: AuthSignUpDto) {
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
