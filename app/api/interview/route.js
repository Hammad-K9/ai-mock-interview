import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { format } from 'date-fns';

import { db } from '@/utils/drizzledb';
import { MockInterview } from '@/utils/schema';

export async function POST(req) {
  try {
    const { userId } = auth();
    const { jsonMockResp, jobTitle, jobDesc, jobExp, createdBy, createdAt } =
      await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!jobTitle || !jobDesc || !jobExp) {
      return new NextResponse(
        'Job title, description, and years of experience required',
        {
          status: 400
        }
      );
    }

    const createdAtFormatted = format(new Date(+createdAt), 'MM/dd/yyyy');

    const interview = await db
      .insert(MockInterview)
      .values({
        jsonMockResp,
        jobTitle,
        jobDesc,
        jobExp,
        createdBy,
        createdAt: createdAtFormatted
      })
      .returning({ mockId: MockInterview.mockId });

    return NextResponse.json(interview);
  } catch (error) {
    console.log('[INTERVIEWS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
