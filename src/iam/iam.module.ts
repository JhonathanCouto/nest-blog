import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [LoginModule, RegisterModule],
  providers: [JwtService],
})
export class IamModule {}
