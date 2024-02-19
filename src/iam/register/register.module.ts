import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { HashingService } from '../hashing/hashing.service';
import { BcryptService } from '../hashing/bcrypt.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [RegisterController],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    RegisterService,
  ],
})
export class RegisterModule {}
