import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'securePassword123' })
  @IsString()
  password!: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '1990-01-01' })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({ example: 'Male', enum: ['Male', 'Female', 'Other'] })
  @IsString()
  @IsOptional()
  gender?: 'Male' | 'Female' | 'Other';

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;
}
