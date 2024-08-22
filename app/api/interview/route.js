import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

import { desc, eq } from 'drizzle-orm';
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

    const interview = await db
      .insert(MockInterview)
      .values({
        jsonMockResp,
        jobTitle,
        jobDesc,
        jobExp,
        createdBy,
        createdAt
      })
      .returning({ mockId: MockInterview.mockId });

    return NextResponse.json(interview);
  } catch (error) {
    console.log('[INTERVIEWS_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { emailAddress } = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    );

    const interviewList = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.createdBy, emailAddress))
      .orderBy(desc(MockInterview.createdAt));

    return NextResponse.json(interviewList);
  } catch (error) {
    console.log('[INTERVIEWS_GET_ALL]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
