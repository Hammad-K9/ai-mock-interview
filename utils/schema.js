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

export const Subscriptions = pgTable('subscriptions', {
  customerId: text('customerId').primaryKey(),
  subscriptionId: text('subscriptionId'),
  subscriptionType: text('subscriptionType'),
  email: varchar('email'),
  date: varchar('date')
});

export const Payments = pgTable('payments', {
  paymentId: text('paymentId').primaryKey(),
  customerId: text('customerId'),
  amount: numeric('amount'),
  email: varchar('email'),
  date: varchar('date')
});
