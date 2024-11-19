import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import { ApiResponse } from '@nestjs/swagger';
import { AppController } from '@/app.controller';
import { usersTable } from '@/modules/drizzle/schema';
import { ApiStandardResponse } from '@/modules/swagger/decorators/standard-response.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

type User = InferSelectModel<typeof usersTable>;

@Controller('user')
export class UserController extends AppController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User[] | null> {
    return await this.userService.create(data);
  }

  @Get()
  @ApiStandardResponse({
    status: 200,
    description: 'List of users retrieved successfully',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const data = await this.userService.findAll();

    return data;
  }

  @Get(':id')
  @ApiStandardResponse({
    status: 200,
    description: 'Get user by id',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param() params: FindOneUserDto): Promise<UserResponseDto> {
    const data = await this.userService.findOne(params);

    if (!data) {
      throw new NotFoundException(`User ${params.id} not found`);
    }

    return data;
  }
}
