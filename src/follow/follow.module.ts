import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
