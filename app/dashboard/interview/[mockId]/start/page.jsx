'use client';

import React, { useEffect, useState } from 'react';
import { ArrowBigLeft, ArrowBigRight, Check } from 'lucide-react';
import Link from 'next/link';

import appService from '@/services/appService';
import QuestionsSection from '@/components/QuestionsSection';
import RecordAnswerSection from '@/components/RecordAnswerSection';
import { Button } from '@/components/ui/button';

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
          setActiveQuestion={setActiveQuestion}
        />
        <RecordAnswerSection
          questions={questions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex gap-6 justify-center md:justify-end">
        <Button
          className="flex gap-2"
          disabled={activeQuestion === 0}
          onClick={() => setActiveQuestion(activeQuestion - 1)}
        >
          <ArrowBigLeft /> Previous Question
        </Button>
        <Button
          className="flex gap-2"
          disabled={activeQuestion === questions?.length - 1}
          onClick={() => setActiveQuestion(activeQuestion + 1)}
        >
          Next Question <ArrowBigRight />
        </Button>
        {activeQuestion === questions?.length - 1 && (
          <Link href={`/dashboard/interview/${mockId}/feedback`}>
            <Button className="flex gap-2">
              End Interview <Check />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
