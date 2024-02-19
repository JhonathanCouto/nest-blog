import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../login/decorators/auth-guard.decorator';
import { AuthType } from '../login/enums/auth-type.enum';

@ApiTags('Auth')
@AuthGuard(AuthType.None)
@Controller('auth/register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      await this.registerService.register(registerUserDto);

      return {
        message: 'User registered successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
