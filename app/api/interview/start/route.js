import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

import { db } from '@/utils/drizzledb';
import { UserAnswer } from '@/utils/schema';

export async function POST(req) {
  try {
    const { userId } = auth();
    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      createdBy,
      createdAt
    } = await req.json();

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!mockIdRef || !question) {
      return new NextResponse('mockIdRef and question required', {
        status: 400
      });
    }

    const userAnswer = await db
      .insert(UserAnswer)
      .values({
        mockIdRef,
        question,
        correctAns,
        userAns,
        feedback,
        rating,
        createdBy,
        createdAt
      })
      .returning();

    return NextResponse.json(userAnswer);
  } catch (error) {
    console.log('[INTERVIEW_START_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
