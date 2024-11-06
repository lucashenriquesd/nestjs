import { Body, Controller, Get, Post } from '@nestjs/common';
import { InferSelectModel } from 'drizzle-orm';
import { usersTable } from '@/drizzle/schema';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

type User = InferSelectModel<typeof usersTable>;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      //
    }
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }
}
