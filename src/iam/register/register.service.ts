import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashingService } from '../hashing/hashing.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    registerUserDto.password = await this.hashingService.hash(
      registerUserDto.password,
    );

    return this.usersService.create(registerUserDto);
  }
}
