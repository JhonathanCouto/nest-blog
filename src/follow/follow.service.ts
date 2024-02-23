import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
  ) {}

  async create(data: DeepPartial<Follow>): Promise<Follow> {
    return await this.followRepository.save(this.followRepository.create(data));
  }

  async findOne(fields: FindOptionsWhere<Follow>): Promise<Follow> {
    return await this.followRepository.findOne({ where: fields });
  }

  async delete(criteria: FindOptionsWhere<Follow>): Promise<void> {
    await this.followRepository.delete(criteria);
  }
}
