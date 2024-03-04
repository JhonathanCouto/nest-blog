import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';
export class UpdateUserDto {
  @ApiProperty({ example: 'https://api.realworld.io/images/demo-avatar.png' })
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  username?: string;

  @ApiProperty({ example: 'Some bio' })
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: 'test1@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  password?: string;
}
