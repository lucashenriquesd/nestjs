import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiStandardResponse } from '@/modules/swagger/decorators/standard-response.decorator';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UserResponseDto } from '@/modules/user/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiStandardResponse({
    status: 201,
    description: 'User created',
    type: UserResponseDto,
  })
  async signup(@Body() dto: SignupDto): Promise<UserResponseDto | null> {
    const data = await this.authService.signup(dto);

    const userResponse = plainToInstance(UserResponseDto, data);

    return userResponse;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
