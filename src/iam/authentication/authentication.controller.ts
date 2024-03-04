import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthGuard } from './decorators/auth-guard.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthType } from './enums/auth-type.enum';
import { LoginResponseType } from './types/login-response.type';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginDto } from './dto/login.dto';
import { AuthenticationService } from './authentication.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ActiveUser } from '../decorators/active-user.decorator';
import { ActiveUserData } from '../interfaces/active-user-data.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @AuthGuard(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseType> {
    return await this.authenticationService.login(loginDto);
  }

  @Post('register')
  @AuthGuard(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      await this.authenticationService.register(registerUserDto);

      return {
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('me')
  @AuthGuard(AuthType.Bearer)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async me(@ActiveUser() activeUser: ActiveUserData) {
    console.log(activeUser);
    return this.authenticationService.me(activeUser.sub);
  }

  @Patch('me')
  @AuthGuard(AuthType.Bearer)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  update(
    @ActiveUser() activeUser: ActiveUserData,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.authenticationService.update(activeUser.sub, userDto);
  }

  @Post('refresh-token')
  @AuthGuard(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<LoginResponseType> {
    return await this.authenticationService.refreshToken(refreshTokenDto);
  }
}
