import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { eq } from 'drizzle-orm';
import { db } from '@/utils/drizzledb';
import { UserAnswer } from '@/utils/schema';

export async function GET(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const feedback = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.id))
      .orderBy(UserAnswer.createdAt);

    return NextResponse.json(feedback);
  } catch (error) {
    console.log('[INTERVIEW_FEEDBACK_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
