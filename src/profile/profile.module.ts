import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { FollowModule } from 'src/follow/follow.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [FollowModule, UsersModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
