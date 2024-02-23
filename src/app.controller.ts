import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './iam/authentication/decorators/auth-guard.decorator';
import { AuthType } from './iam/authentication/enums/auth-type.enum';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AuthGuard(AuthType.None)
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @AuthGuard(AuthType.Bearer)
  @ApiBearerAuth()
  @Get('secure')
  getProtectedResource() {
    return this.appService.getSecureResource();
  }
}
