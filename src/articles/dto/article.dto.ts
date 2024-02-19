import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Tag } from 'src/tags/entities/tag.entity';

export class ArticloDto {
  @ApiProperty({ example: 'title', description: 'The title of the article' })
  readonly title: string;

  @ApiProperty({
    example: 'description',
    description: 'The description of the article',
  })
  readonly description: string;

  @ApiProperty({ example: 'body', description: 'The body of the article' })
  readonly body: string;

  @ApiProperty({ example: ['tag1', 'tag2'] })
  @Transform(({ value }: { value: Tag[] }) => value.map((tag) => tag.name))
  readonly tagList: string[];
}
