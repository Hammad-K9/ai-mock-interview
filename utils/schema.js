import { pgTable, varchar, text } from 'drizzle-orm/pg-core';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 10 });

export const MockInterview = pgTable('mockInterview', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uid.rnd()),
  jsonMockResp: text('jsonMockResp').notNull(),
  jobTitle: varchar('jobTitle').notNull(),
  jobDesc: varchar('jobDesc').notNull(),
  jobExp: varchar('jobExp').notNull(),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull(),
  mockId: text('mockId').$defaultFn(() => uid.rnd())
});
