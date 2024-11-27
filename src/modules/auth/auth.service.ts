import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '@/modules/user/user.service';
import { usersTable } from '@/modules/drizzle/schema';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly drizzle: DrizzleService,
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_SALT_ROUNDS') ?? '10',
      10,
    );

    const hash = await bcrypt.hash(password, saltRounds);

    return hash;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(dto: SignupDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = { ...dto, password: hashedPassword };

    const user = await this.drizzle.db
      .insert(usersTable)
      .values(newUser)
      .returning();

    return user[0] || null;
  }
}
