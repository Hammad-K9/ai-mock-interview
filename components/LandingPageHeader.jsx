import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const LandingPageHeader = async () => {
  const user = await currentUser();

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/icon.jpg" alt="logo" width={75} height={75} />
      {user ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button className="block rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary/90 focus:outline-none focus:ring active:bg-customGreen-400 w-auto">
            Sign In
          </Button>
        </Link>
      )}
    </div>
  );
};

export default LandingPageHeader;
