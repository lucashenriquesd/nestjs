import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export type GenderOrNull = keyof typeof Gender | null;

@Exclude() // Exclude all properties by default
export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @Expose()
  id!: string;

  @ApiProperty({ example: '1990-01-01' })
  @Expose()
  createdAt!: Date;

  @ApiProperty({ example: 'john@example.com' })
  @Expose()
  email!: string;

  @ApiProperty({ example: 'John Doe' })
  @Expose()
  name?: string | null;

  @ApiProperty({ example: '1990-01-01' })
  @Expose()
  birthDate?: string | null;

  @ApiProperty({
    example: 'Male',
    enum: Gender,
  })
  @Expose()
  gender?: GenderOrNull;

  @ApiProperty({ example: '+1234567890' })
  @Expose()
  phone?: string | null;
}
