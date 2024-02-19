import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Article',
    description: 'The title of the article',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Article',
    description: 'The description of the article',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Article body',
    description: 'The body of the article',
  })
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty({ example: ['tag1', 'tag2', 'tag3', 'tag4'] })
  @IsOptional()
  tagList?: string[];
}
