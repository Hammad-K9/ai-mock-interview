import { pgTable, varchar, text, numeric } from 'drizzle-orm/pg-core';
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

export const UserAnswer = pgTable('userAnswer', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => uid.rnd()),
  mockIdRef: text('mockIdRef').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correctAns'),
  userAns: text('userAns'),
  feedback: text('feedback'),
  rating: numeric('rating'),
  createdBy: varchar('createdBy').notNull(),
  createdAt: varchar('createdAt').notNull()
});
