import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './decorators/auth-guard.decorator';
import { AuthType } from './enums/auth-type.enum';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseType } from './types/login-response.type';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Auth')
@AuthGuard(AuthType.None)
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseType> {
    return await this.loginService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseType> {
    return await this.loginService.refreshToken(refreshTokenDto);
  }
}
