import { Injectable } from '@nestjs/common';
import { InferSelectModel, eq } from 'drizzle-orm';
import { usersTable } from '@/modules/drizzle/schema';
import { DrizzleService } from '@/modules/drizzle/drizzle.service';
import { UserResponseDto } from './dto/user-response.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';

type User = InferSelectModel<typeof usersTable>;

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async completeProfile(userId: string, dto: CompleteProfileDto) {
    const user = await this.drizzle.db
      .update(usersTable)
      .set({
        name: dto.name,
        birthDate: dto.birthDate,
        gender: dto.gender,
        phone: dto.phone,
      })
      .where(eq(usersTable.id, userId))
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
