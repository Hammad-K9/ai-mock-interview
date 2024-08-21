'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import appService from '@/services/appService';
import InterviewItemCard from '@/components/InterviewItemCard';

const InterviewList = () => {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const res = await appService.getAll('/api/interview');
    setInterviewList(res);
  };

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList &&
          interviewList.map((interview, i) => (
            <InterviewItemCard key={i} interview={interview} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;
