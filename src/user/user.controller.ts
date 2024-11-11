import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import { usersTable } from '@/drizzle/schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

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
  async findOne(@Param() params: FindOneUserDto): Promise<User[]> {
    return await this.userService.findOne(params.id);
  }
}
