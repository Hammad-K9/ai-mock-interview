'use client';

import React, { useEffect, useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import appService from '@/services/appService';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

const Feedback = ({ params }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const { mockId } = params;

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const res = await appService.getAll(`/api/interview/${mockId}/feedback`);
      console.log('res ; ', res);
      setFeedbackList(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>
      <h2 className="text-primary text-lg my-3">
        Your overall interview rating: <strong>7/10</strong>
      </h2>
      <h2 className="text-sm text-gray-500">
        Find your question below along with your answer and feedback
      </h2>
      {feedbackList &&
        feedbackList.map((f, i) => (
          <Collapsible key={i} className="my-7">
            <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between items-center gap-7 w-full">
              {f.question} <ChevronsUpDown className="h-6 w-6 md:h-4 md:w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="flex flex-col gap-2">
                <h2 className="text-red-500 p-2 border rounded-lg">
                  <strong>Rating: </strong>
                  {f.rating}
                </h2>
                <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                  <strong>Your Answer: </strong>
                  {f.userAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                  <strong>Correct Answer: </strong>
                  {f.correctAns}
                </h2>
                <h2 className="p-2 border rounded-lg bg-cyan-50 text-sm text-primary">
                  <strong>Feedback: </strong>
                  {f.feedback}
                </h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      <Link href="/dashboard">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default Feedback;
