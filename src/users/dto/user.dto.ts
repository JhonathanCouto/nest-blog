import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MaxLength(70)
  readonly username: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ example: 'I am a software developer' })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  readonly bio?: string;

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password: string;
}
