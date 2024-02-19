import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class QueryArticleDto {
  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  @IsPositive()
  page: number;

  @ApiProperty({
    required: false,
  })
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  tagName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  favorited?: string;
}
