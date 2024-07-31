import React from 'react';
import Header from '@/components/Header';

const DashboardLayout = ({ children }) => (
  <div>
    <Header />
    {children}
  </div>
);

export default DashboardLayout;
