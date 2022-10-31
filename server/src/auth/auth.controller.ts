import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { AuthLogInDto, AuthSignUpDto } from './dto';
import { Tokens } from './types';
import {
  ApiTags,
  ApiResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiHeader,
} from '@nestjs/swagger';
import { reqeustSchemas, responseSchemas } from './schema';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: reqeustSchemas.signup,
  })
  @ApiCreatedResponse({
    status: 201,
    description: '회원가입 완료!',
    schema: responseSchemas.signup,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @Public()
  @Post('/signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto);
  }

  @ApiBody({
    schema: reqeustSchemas.login,
  })
  @ApiOkResponse({
    description: '로그인 성공',
    schema: responseSchemas.login,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @Public()
  @HttpCode(200)
  @Post('/login')
  login(@Body() dto: AuthLogInDto): Promise<Tokens> {
    return this.authService.login(dto);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    description: '로그아웃 성공',
    schema: responseSchemas.logout,
  })
  @Public()
  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('/logout')
  logout(@GetCurrentUser('userId') userId: number) {
    return this.authService.logout(userId);
  }

  @ApiHeader({
    name: 'refresh-token',
    description: 'refreshToken',
  })
  @ApiCreatedResponse({
    description: '토큰 재발급 성공',
    schema: responseSchemas.login,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
  })
  @Public()
  @UseGuards(RtGuard)
  @Post('/refresh-tokens')
  refreshTokens(
    @GetCurrentUser('userId') userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Get('check')
  @Public()
  emailCheck(@Query('email') email: string) {
    return this.authService.validateEmail(email);
  }
}
