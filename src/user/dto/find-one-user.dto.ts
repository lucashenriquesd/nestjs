import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class FindOneUserDto {
  @ApiProperty({ example: 'eb4505f0-9c0a-11ef-840a-05c2c5d95b8d' })
  @IsUUID()
  id!: string;
}
