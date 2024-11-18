import {
  pgTable,
  uuid,
  text,
  date,
  timestamp,
  boolean,
} from 'drizzle-orm/pg-core';
import { uuidv7 } from 'uuidv7';

const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp()
    .notNull()
    .$onUpdate(() => new Date()),
  deleted_at: timestamp(),
};

const commonColumns = {
  id: uuid()
    .$default(() => uuidv7())
    .primaryKey(),
  ...timestamps,
  active: boolean().default(true).notNull(),
};

export const usersTable = pgTable('users', {
  ...commonColumns,
  email: text().notNull().unique(),
  password: text().notNull(),
  name: text(),
  birth_date: date(),
  gender: text({ enum: ['Male', 'Female', 'Other'] }),
  phone: text(),
});
