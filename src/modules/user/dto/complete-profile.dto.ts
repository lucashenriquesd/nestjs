import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export class CompleteProfileDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name!: string;

  @ApiProperty({ example: '1990-01-01' })
  @Type(() => Date)
  @IsDate()
  birthDate!: string;

  @ApiProperty({ example: 'Male', enum: Gender })
  @IsEnum(Gender)
  gender!: Gender;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  phone!: string;
}
