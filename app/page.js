import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import LandingPageHeader from '@/components/LandingPageHeader';
import Hero from '@/components/Hero';

const Home = () => {
  const { userId } = auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div>
      <LandingPageHeader />
      <Hero />
    </div>
  );
};

export default Home;
