import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'John Doe', required: false })
  name?: string | null;

  @ApiProperty({ example: '1990-01-01', required: false })
  birth_date?: string | null;

  @ApiProperty({
    example: 'Male',
    enum: ['Male', 'Female', 'Other'],
    required: false,
  })
  gender?: 'Male' | 'Female' | 'Other' | null;

  @ApiProperty({ example: '+1234567890', required: false })
  phone?: string | null;
}
