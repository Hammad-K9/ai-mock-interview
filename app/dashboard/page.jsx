import React from 'react';

import AddNewInterview from '@/components/AddNewInterview';
import InterviewList from '@/components/InterviewList';

const Dashboard = () => (
  <div className="p-5 mb-20">
    <h2 className="font-bold text-2xl">Dashboard</h2>
    <h2 className="text-gray-500">Create and start your AI Mock Interview</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 my-5">
      <AddNewInterview />
    </div>
    <InterviewList />
  </div>
);

export default Dashboard;
