import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateTagDto } from './dto/create-tag.dto';
import { TagsService } from './tags.service';
import { AuthGuard } from 'src/iam/login/decorators/auth-guard.decorator';
import { AuthType } from 'src/iam/login/enums/auth-type.enum';
import { Tag } from './entities/tag.entity';

@ApiTags('Tags')
@AuthGuard(AuthType.None)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  async findAll(): Promise<string[]> {
    const tags = await this.tagsService.findAll();
    return tags.map((tag) => tag.name);
  }

  @Get('popular')
  findPopularTags(): Promise<Tag[]> {
    return this.tagsService.findPopularTags();
  }
}
