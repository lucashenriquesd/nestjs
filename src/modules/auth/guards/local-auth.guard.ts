import {
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const loginDto = plainToInstance(LoginDto, request.body);

    const errors = await validate(loginDto, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      // Extract error messages into an array
      const errorMessages = errors.flatMap((error) => {
        // Collect messages from each constraint
        const constraints = error.constraints
          ? Object.values(error.constraints)
          : [];
        // If there are non-whitelisted properties, add their messages
        if (error.children && error.children.length > 0) {
          error.children.forEach((child) => {
            if (child.constraints) {
              constraints.push(...Object.values(child.constraints));
            }
          });
        }
        return constraints;
      });

      throw new BadRequestException(errorMessages);
    }

    request.body = loginDto;

    // Proceed with authentication
    return super.canActivate(context) as Promise<boolean>;
  }
}
