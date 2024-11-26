import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS') ?? '10',
      10,
    );

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }
}
