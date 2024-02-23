import { Injectable, NotFoundException } from '@nestjs/common';
import { FollowService } from 'src/follow/follow.service';
import { UsersService } from 'src/users/users.service';
import { ProfileData } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
  constructor(
    private readonly followService: FollowService,
    private readonly userService: UsersService,
  ) {}

  async findProfile(
    id: number,
    followingUsername: string,
  ): Promise<ProfileData> {
    const user = await this.userService.findOne({
      username: followingUsername,
    });

    if (!user) {
      throw new NotFoundException(
        `User with username ${followingUsername} not found`,
      );
    }

    const profile: ProfileData = {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: false,
    };

    const follow = await this.followService.findOne({
      followerId: id,
      followingId: user.id,
    });

    profile.following = !!follow;

    return profile;
  }

  async follow(followerId: number, username: string) {
    const follower = await this.userService.findOne({ id: followerId });
    const following = await this.userService.findOne({ username });

    if (!following) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (following.id === follower.id) {
      throw new NotFoundException('You cannot follow yourself');
    }

    const follow = await this.followService.findOne({
      followerId: follower.id,
      followingId: following.id,
    });

    if (!follow) {
      await this.followService.create({
        followerId: follower.id,
        followingId: following.id,
      });
    }

    const profile: ProfileData = {
      username: following.username,
      bio: following.bio,
      image: following.image,
      following: true,
    };

    return profile;
  }

  async unfollow(followerId: number, username: string) {
    const follower = await this.userService.findOne({ id: followerId });
    const following = await this.userService.findOne({ username });

    if (!following) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (following.id === follower.id) {
      throw new NotFoundException('You cannot unfollow yourself');
    }

    await this.followService.delete({
      followerId: follower.id,
      followingId: following.id,
    });

    const follow = await this.followService.findOne({
      followerId: follower.id,
      followingId: following.id,
    });

    if (follow) {
      await this.followService.delete({
        followerId: follower.id,
        followingId: following.id,
      });
    }

    const profile: ProfileData = {
      username: following.username,
      bio: following.bio,
      image: following.image,
      following: false,
    };

    return profile;
  }
}
