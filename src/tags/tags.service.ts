import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { Tag } from './entities/tag.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagsRepository.save(
      this.tagsRepository.create(createTagDto),
    );
  }

  findAll(): Promise<Tag[]> {
    return this.tagsRepository.find();
  }

  async findPopularTags(): Promise<Tag[]> {
    const popularTags = await this.tagsRepository
      .createQueryBuilder('tag')
      .leftJoin('tag.articles', 'article')
      .groupBy('tag.id')
      .orderBy('COUNT(article.id)', 'DESC')
      .addSelect('COUNT(article.id)', 'articlesCount')
      .getMany();

    return popularTags;
  }

  findAllByOptions() {
    return;
  }

  async findOne(fields: FindOptionsWhere<Tag>): Promise<Tag> {
    return await this.tagsRepository.findOne({ where: fields });
  }
}
