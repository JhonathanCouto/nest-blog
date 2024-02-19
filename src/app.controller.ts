import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './iam/login/decorators/auth-guard.decorator';
import { AuthType } from './iam/login/enums/auth-type.enum';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AuthGuard(AuthType.None)
  @Get()
  getHello(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getHello());
  }

  @AuthGuard(AuthType.Bearer)
  @ApiBearerAuth()
  @Get('secure')
  getProtectedResource(@Res() res: Response) {
    return res.status(HttpStatus.OK).json(this.appService.getSecureResource());
  }
}
