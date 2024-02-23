import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entities/article.entity';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { QueryArticleDto } from './dto/query-article.dto';
import slug from 'slug';
import { TagsService } from 'src/tags/tags.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number) {
    const author = await this.usersService.findOne({ id: userId });

    const existentArticle = await this.articlesRepository.findOneBy({
      title: createArticleDto.title,
    });

    if (existentArticle) {
      throw new BadRequestException('Article with this title already exists');
    }

    const tags = await Promise.all(
      createArticleDto.tagList.map(async (tagName) => {
        let tag = await this.tagsService.findOne({ name: tagName });
        if (!tag) {
          tag = await this.tagsService.create({ name: tagName });
        }
        return tag;
      }),
    );

    return this.articlesRepository.save(
      this.articlesRepository.create({
        ...createArticleDto,
        slug: await this.slugify(createArticleDto.title),
        author,
        tags,
      }),
    );
  }

  async findAll(
    query: QueryArticleDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Article>> {
    const where: FindOptionsWhere<Article> = {};

    if (query.tagName) {
      where.tags = { name: query.tagName };
    }

    if (query.author) {
      where.author = { username: query.author };
    }

    return paginate<Article>(this.articlesRepository, options, {
      where,
      order: { createdAt: 'ASC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, data: DeepPartial<Article>): Promise<Article> {
    return this.articlesRepository.save(
      this.articlesRepository.create({ id, ...data }),
    );
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  async favorite(userId: number, slug: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { slug },
      relations: ['favoritedBy'],
    });

    const user = await this.usersService.findOne({ id: userId });

    if (!article) {
      throw new BadRequestException('Article does not exist');
    }

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isNewFavorite = user.favorites
      ? user.favorites.findIndex((_article) => _article.id === article.id) < 0
      : false;

    if (isNewFavorite) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.usersService.update(user.id, user);
      await this.articlesRepository.save(article);
    }

    return article;
  }

  async unfavorite(userId: number, slug: string): Promise<Article> {
    const article = await this.articlesRepository.findOne({
      where: { slug },
      relations: ['favoritedBy'],
    });

    const user = await this.usersService.findOne({ id: userId });

    if (!article) {
      throw new BadRequestException('Article does not exist');
    }

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const deleteIndex = user.favorites
      ? user.favorites.findIndex((_article) => _article.id === article.id)
      : -1;

    if (deleteIndex >= 0) {
      user.favorites.splice(deleteIndex, 1);
      article.favoritesCount--;
      await this.usersService.update(user.id, user);
      await this.articlesRepository.save(article);
    }

    return article;
  }

  private async slugify(title: string): Promise<string> {
    return slug(title, { lower: true });
  }
}
