import { Injectable } from '@nestjs/common';
import { InferInsertModel, InferSelectModel, eq } from 'drizzle-orm';
import { instanceToPlain } from 'class-transformer';
import { usersTable } from '@/drizzle/schema';
import { DrizzleService } from '@/drizzle/drizzle.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';

type NewUser = InferInsertModel<typeof usersTable>;
type User = InferSelectModel<typeof usersTable>;

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(data: CreateUserDto) {
    const userDataPlain = instanceToPlain(data) as NewUser;

    const userData: NewUser = {
      ...userDataPlain,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = await this.drizzle.db
      .insert(usersTable)
      .values(userData)
      .returning();

    return user;
  }

  async update(id: string, data: User) {
    await this.drizzle.db
      .update(usersTable)
      .set({
        name: data.name,
        birth_date: data.birth_date,
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

    return user[0];
  }
}
