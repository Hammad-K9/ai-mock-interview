import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { eq } from 'drizzle-orm';
import { db } from '@/utils/drizzledb';
import { MockInterview } from '@/utils/schema';

export async function GET(req, { params }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const interview = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.id));

    return NextResponse.json(interview);
  } catch (error) {
    console.log('[INTERVIEW_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
