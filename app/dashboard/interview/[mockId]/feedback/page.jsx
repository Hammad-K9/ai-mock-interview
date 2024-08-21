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
  const [feedbackList, setFeedbackList] = useState();
  const [ratingSum, setRatingSum] = useState();
  const { mockId } = params;

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const res = await appService.getAll(`/api/interview/${mockId}/feedback`);
      setFeedbackList(res);
      setRatingSum(res.reduce((sum, f) => sum + +f.rating, 0));
    } catch (error) {
      console.log(error);
    }
  };

  const avgRating = (rating) => {
    const avg = (rating + 0.3) / feedbackList?.length;
    return avg.toFixed(1).endsWith('.0') ? avg : avg.toFixed(1);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold">Here is your interview feedback</h2>
      {feedbackList?.length === 0 ? (
        <div className="font-bold text-lg text-gray-500 my-3">
          No feedback found
        </div>
      ) : (
        <>
          <h2 className="text-primary text-lg my-3 flex gap-[4px]">
            Your overall interview rating:
            {feedbackList && ratingSum && (
              <strong>{avgRating(ratingSum)} / 10</strong>
            )}
          </h2>
          <h2 className="text-sm text-gray-500">
            Find your question below along with your answer and feedback
          </h2>
          {feedbackList &&
            feedbackList.map((f, i) => (
              <Collapsible key={i} className="my-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg my-2 text-left flex justify-between items-center gap-7 w-full">
                  {f.question}
                  <ChevronsUpDown className="h-[15px] w-[15px]" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {f.rating} / 10
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
        </>
      )}
      <Link href="/dashboard">
        <Button>Home Page</Button>
      </Link>
    </div>
  );
};

export default Feedback;
