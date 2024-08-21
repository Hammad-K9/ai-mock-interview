import React from 'react';
import { Lightbulb, Volume2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

const QuestionsSection = ({ questions, activeQuestion, setActiveQuestion }) => {
  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
      return;
    }
    alert('Your browser does not support text to speech');
  };

  return (
    questions && (
      <div className="p-5 border rounded-lg my-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {questions?.map((q, i) => (
            <Button
              key={i}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${activeQuestion === i ? 'bg-primary text-white' : 'bg-secondary text-black'}`}
              onClick={() => setActiveQuestion(i)}
            >
              Question #{i + 1}
            </Button>
          ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {questions[activeQuestion]?.question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() => textToSpeech(questions[activeQuestion]?.question)}
        />
        <div className="border rounded-lg p-5 bg-blue-50 mt-20">
          <h2 className="flex gap-2 items-center text-primary">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-sm text-primary">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};
export default QuestionsSection;
