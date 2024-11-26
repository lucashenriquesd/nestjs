import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude } from 'class-transformer';

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

  @ApiProperty({ example: 'John Doe', required: false })
  @Expose()
  name?: string | null;

  @ApiProperty({ example: '1990-01-01', required: false })
  @Expose()
  birth_date?: string | null;

  @ApiProperty({
    example: 'Male',
    enum: ['Male', 'Female', 'Other'],
    required: false,
  })
  @Expose()
  gender?: 'Male' | 'Female' | 'Other' | null;

  @ApiProperty({ example: '+1234567890', required: false })
  @Expose()
  phone?: string | null;
}
