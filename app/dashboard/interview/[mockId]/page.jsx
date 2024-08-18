'use client';

import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';

import appService from '@/services/appService';
import { Button } from '@/components/ui/button';

const Interview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const { mockId } = params;

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    try {
      const res = await appService.get(`/api/interview/${mockId}`);
      setInterviewData(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-10 mb-20">
      <h2 className="font-bold text-2xl">Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-2">
          <div className="p-5 rounded-lg border">
            <h2 className="text-lg">
              <strong>Job Title: </strong> {interviewData?.jobTitle}
            </h2>
            <h2 className="text-lg">
              <strong>Job Description: </strong> {interviewData?.jobDesc}
            </h2>
            <h2 className="text-lg">
              <strong>Years of Experience: </strong> {interviewData?.jobExp}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center">
              <Lightbulb className="text-yellow-500" />
              <strong>Information</strong>
            </h2>
            <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              style={{ height: 300, width: 300 }}
            />
          ) : (
            <div className="flex flex-col">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button onClick={() => setWebcamEnabled(true)} variant="ghost">
                Enable Webcam and Microphone
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end items-end my-2">
        <Link href={`/dashboard/interview/${mockId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
