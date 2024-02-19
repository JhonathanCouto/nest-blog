import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interfaces/active-user-data.interface';
import { AuthGuard } from 'src/iam/login/decorators/auth-guard.decorator';
import { AuthType } from 'src/iam/login/enums/auth-type.enum';
import { QueryArticleDto } from './dto/query-article.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Article } from './entities/article.entity';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @AuthGuard(AuthType.Bearer)
  @ApiBearerAuth()
  create(
    @ActiveUser() activeUser: ActiveUserData,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto, activeUser.sub);
  }

  @Get()
  @AuthGuard(AuthType.None)
  async findAll(@Query() query: QueryArticleDto): Promise<Pagination<Article>> {
    const page = query.page ?? 1;
    const limit = query.limit > 100 ? 100 : query.limit;

    return this.articlesService.findAll(query, {
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
