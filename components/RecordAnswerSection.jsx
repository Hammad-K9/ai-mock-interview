import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { Mic, StopCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';
import { chatSession } from '@/components/ui/GeminiModel';
import appService from '@/services/appService';

const RecordAnswerSection = ({ questions, activeQuestion, interviewData }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => `${prevAns} ${result.transcript}`)
    );
  }, [results]);

  const saveUserAnswer = async () => {
    /* 
    We set the results.length to 0 so that every time the user records a new
    answer, the new answer WILL NOT be concatenated with previous answers
    */
    setResults([]);
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
      if (userAnswer.length < 10) {
        setLoading(false);
        toast('Error while saving your answer, please record again');
        return;
      }
      const feedbackPrompt = `Question: ${questions[activeQuestion]?.question} User Answer: ${userAnswer}
      Given the interview question and the user's answer, provide a rating, out of 10, for the user's answer and give feedback to improve the user's answer. Give the feedback in 3-5 lines. Provide all this information in JSON format`;
      const resp = await chatSession.sendMessage(feedbackPrompt);
      const jsonRes = resp.response
        .text()
        .replace('```json', '')
        .replace('```', '');
      const jsonFeedbackRes = JSON.parse(jsonRes);
      try {
        const res = await appService.create('/api/interview/start', {
          mockIdRef: interviewData?.mockId,
          question: questions[activeQuestion]?.question,
          correctAns: questions[activeQuestion]?.answer,
          userAns: userAnswer,
          feedback: jsonFeedbackRes?.feedback,
          rating: jsonFeedbackRes?.rating,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: Date.now()
        });
        if (res) {
          toast('User Answer recorded successfully');
        }
      } catch (error) {
        console.log(error);
      }
      setUserAnswer('');
      setLoading(false);
      return;
    }
    startSpeechToText();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-secondary rounded-lg p-5 mt-20">
        <Image
          src="/webcam.png"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam style={{ height: 300, width: '100%', zIndex: 10 }} />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10 gap-2"
        onClick={() => saveUserAnswer()}
      >
        {isRecording ? (
          <div className="text-red-600 animate-pulse flex items-center gap-2">
            <StopCircle /> Stop Recording
          </div>
        ) : (
          <div className="text-primary flex gap-2 items-center">
            <Mic /> Record Answer
          </div>
        )}
      </Button>
    </div>
  );
};

export default RecordAnswerSection;
