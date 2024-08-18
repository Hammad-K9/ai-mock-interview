import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';

import { Button } from '@/components/ui/button';

const RecordAnswerSection = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => `${prevAns} ${result.transcript}`)
    );
  }, [results]);

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
        variant="outline"
        className="my-10 gap-2"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <div className="flex items-center gap-2 text-red-600">
            <Mic /> Stop Recording
          </div>
        ) : (
          'Record Answer'
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  );
};

export default RecordAnswerSection;
