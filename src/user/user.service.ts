import { Injectable } from '@nestjs/common';
import { InferInsertModel } from 'drizzle-orm';
import { eq } from 'drizzle-orm/expressions';
import { usersTable } from '@/drizzle/schema';
import { DrizzleService } from '@/drizzle/drizzle.service';

type NewUser = InferInsertModel<typeof usersTable>;

@Injectable()
export class UserService {
  constructor(private readonly drizzle: DrizzleService) {}

  async create(data: NewUser) {
    const user = await this.drizzle.db
      .insert(usersTable)
      .values(data)
      .returning();

    return user;
  }

  async update(id: string, data: any) {
    return data;
  }

  async delete(id: string) {
    return id;
  }

  async findAll() {
    const users = await this.drizzle.db.select().from(usersTable);

    return users;
  }

  async findOne(id: string) {
    const user = await this.drizzle.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    return user;
  }
}
