import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import { usersTable } from '@/drizzle/schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

type User = InferSelectModel<typeof usersTable>;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User[] | null> {
    return await this.userService.create(data);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Found',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findOne(@Param() params: FindOneUserDto): Promise<UserResponseDto> {
    const user = await this.userService.findOne(params);

    if (!user) {
      throw new NotFoundException(`User with ID ${params.id} not found`);
    }

    return user;
  }
}
