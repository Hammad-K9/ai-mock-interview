'use client';

import React, { useEffect, useState } from 'react';

import appService from '@/services/appService';
import QuestionsSection from '@/components/QuestionsSection';
import RecordAnswerSection from '@/components/RecordAnswerSection';

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [questions, setQuestions] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const { mockId } = params;

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const res = await appService.get(`/api/interview/${mockId}`);
      const jsonRes = JSON.parse(res.jsonMockResp);
      console.log(jsonRes);
      setQuestions(jsonRes.questions);
      setInterviewData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionsSection
          questions={questions}
          activeQuestion={activeQuestion}
        />
        <RecordAnswerSection />
      </div>
    </div>
  );
};

export default StartInterview;
