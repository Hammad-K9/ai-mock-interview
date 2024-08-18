'use client';

import React, { useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/components/ui/GeminiModel';
import appService from '@/services/appService';

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExp, setJobExp] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobTitle, jobDesc, jobExp);
    const inputPrompt = `Based on the the following information, give me ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format. Give the questions and answers as fields in JSON:
    Job Title: ${jobTitle}
    Job Description: ${jobDesc}
    Years of Experience: ${jobExp}
    `;
    const res = await chatSession.sendMessage(inputPrompt);
    const jsonRes = res.response
      .text()
      .replace('```json', '')
      .replace('```', '');
    try {
      console.log(JSON.parse(jsonRes));
      addInterview(jsonRes);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const addInterview = async (jsonRes) => {
    try {
      const res = await appService.create('/api/interview', {
        jsonMockResp: jsonRes,
        jobTitle,
        jobDesc,
        jobExp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: Date.now()
      });
      console.log('mockID: ', res);
      if (res) {
        setOpenDialog(false);
        router.push(`/dashboard/interview/${res[0]?.mockId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <div
          className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
          onClick={() => setOpenDialog(true)}
        >
          <h2 className="text-lg text-center"> + Add New</h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Job Details</DialogTitle>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <h2>Add the job title, description, and years of experience</h2>
              <div className="mt-2">
                <Label className="text-black" htmlFor="job-title">
                  Job Title
                </Label>
                <Input
                  className="text-black"
                  id="job-title"
                  placeholder="Software Engineer"
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mt-2">
                <Label className="text-black" htmlFor="job-desc">
                  Job Description / Tech Stack
                </Label>
                <Textarea
                  className="text-black"
                  id="job-desc"
                  placeholder="React, NodeJs, Java, Python..."
                  onChange={(e) => setJobDesc(e.target.value)}
                  required
                />
              </div>
              <div className="mt-2">
                <Label className="text-black" htmlFor="job-exp">
                  Years of Experience
                </Label>
                <Input
                  className="text-black"
                  id="job-exp"
                  type="number"
                  placeholder="5"
                  max="100"
                  onChange={(e) => setJobExp(e.target.value)}
                  required
                />
              </div>
              <Button disabled={loading} className="mt-5 w-full" type="submit">
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" /> Generating
                    Questions
                  </>
                ) : (
                  <>Start Mock Interview</>
                )}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewInterview;
