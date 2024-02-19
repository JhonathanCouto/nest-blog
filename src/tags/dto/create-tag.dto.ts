import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTagDto {
  @ApiProperty({ example: 'tag name', description: 'The name of the tag' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
