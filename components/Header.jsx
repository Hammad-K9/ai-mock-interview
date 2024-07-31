'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import NavBar from './Navbar';

const Header = () => {
  useEffect(() => {}, []);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
      <Image src="/icon.jpg" alt="logo" width={75} height={75} />
      <NavBar />
      <UserButton />
    </div>
  );
};

export default Header;
