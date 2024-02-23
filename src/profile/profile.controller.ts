import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/iam/authentication/decorators/auth-guard.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { ProfileService } from './profile.service';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';

@ApiTags('Profile')
@AuthGuard(AuthType.Bearer)
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('/:username')
  async getProfile(
    @ActiveUser() activeUser: ActiveUserData,
    @Param('username') username: string,
  ) {
    return await this.profileService.findProfile(activeUser.sub, username);
  }

  @Post('/:username/follow')
  async follow(
    @ActiveUser() activeUser: ActiveUserData,
    @Param('username') username: string,
  ) {
    return await this.profileService.follow(activeUser.sub, username);
  }

  @Delete('/:username/unfollow')
  async unfollow(
    @ActiveUser() activeUser: ActiveUserData,
    @Param('username') username: string,
  ) {
    return await this.profileService.unfollow(activeUser.sub, username);
  }
}
