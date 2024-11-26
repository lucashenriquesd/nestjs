import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { AppController } from '@/app.controller';
import { ApiStandardResponse } from '@/modules/swagger/decorators/standard-response.decorator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController extends AppController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  @ApiStandardResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto | null> {
    const data = await this.userService.create(dto);

    const userResponse = plainToInstance(UserResponseDto, data);

    return userResponse;
  }

  @Get()
  @ApiStandardResponse({
    status: 200,
    description: 'Get all users',
    type: [UserResponseDto],
  })
  async findAll(): Promise<UserResponseDto[]> {
    const data = await this.userService.findAll();

    const userResponse = plainToInstance(UserResponseDto, data);

    return userResponse;
  }

  @Get(':id')
  @ApiStandardResponse({
    status: 200,
    description: 'Get user by id',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param() dto: FindOneUserDto): Promise<UserResponseDto> {
    const data = await this.userService.findOne(dto);

    if (!data) {
      throw new NotFoundException(`User ${dto.id} not found`);
    }

    const userResponse = plainToInstance(UserResponseDto, data);

    return userResponse;
  }
}
