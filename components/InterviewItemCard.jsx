import React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const InterviewItemCard = ({ interview }) => {
  const convertDate = (date) => format(new Date(+date), 'MM/dd/yyyy');

  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-medium text-primary">{interview?.jobTitle}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExp} years of experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Date Created: {convertDate(interview?.createdAt)}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <Link
          href={`/dashboard/interview/${interview?.mockId}/feedback`}
          className="w-full"
        >
          <Button size="sm" variant="outline" className="w-full">
            Feedback
          </Button>
        </Link>
        <Link
          href={`/dashboard/interview/${interview?.mockId}`}
          className="w-full"
        >
          <Button size="sm" className="w-full">
            Start
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewItemCard;
