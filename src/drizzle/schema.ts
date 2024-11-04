import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
};

const commonColumns = {
  id: uuid()
    .default(sql`uuid_generate_v1()`)
    .primaryKey(),
  ...timestamps,
  active: boolean().default(true).notNull(),
};

export const usersTable = pgTable('users', {
  ...commonColumns,
  email: text().notNull().unique(),
  name: text(),
  birth_date: date(),
  gender: text({ enum: ['Male', 'Female', 'Other'] }),
  phone: text(),
});
