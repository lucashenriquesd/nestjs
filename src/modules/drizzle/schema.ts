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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
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
  birthDate: date('birth_date'),
  gender: text({ enum: ['Male', 'Female', 'Other'] }),
  phone: text(),
});
