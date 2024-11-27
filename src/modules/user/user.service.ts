import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InferSelectModel, eq } from 'drizzle-orm';
import { usersTable } from '@/modules/drizzle/schema';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { AuthService } from '@/modules/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

type User = InferSelectModel<typeof usersTable>;

@Injectable()
export class UserService {
  constructor(
    private readonly drizzle: DrizzleService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await this.authService.hashPassword(dto.password);
    const newUser = { ...dto, password: hashedPassword };

    const user = await this.drizzle.db
      .insert(usersTable)
      .values(newUser)
      .returning();

    return user[0] || null;
  }

  async update(id: string, data: User) {
    await this.drizzle.db
      .update(usersTable)
      .set({
        name: data.name,
        birthDate: data.birthDate,
        gender: data.gender,
        phone: data.phone,
      })
      .where(eq(usersTable.id, id));
    return data;
  }

  async delete(id: string) {
    return id;
  }

  async findAll() {
    const users = await this.drizzle.db.select().from(usersTable);

    return users;
  }

  async findOne(params: FindOneUserDto): Promise<UserResponseDto> {
    const user = await this.drizzle.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, params.id))
      .limit(1);

    return user[0] || null;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.drizzle.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user[0] || null;
  }
}
