import React from 'react';
import { usePathname } from 'next/navigation';
import { Layout, CircleHelp, ShieldPlus, Sparkle } from 'lucide-react';
import Link from 'next/link';

import useWindowSize from '@/hooks/useWindowSize';

const Navbar = () => {
  const path = usePathname();
  const { width } = useWindowSize();
  const navbarItems = [
    {
      id: 0,
      name: 'Dashboard',
      icon: Layout,
      path: '/dashboard'
    },
    {
      id: 1,
      name: 'Upgrade',
      icon: ShieldPlus,
      path: '/upgrade'
    }
  ];

  return width >= 768 ? (
    <ul className="flex gap-6">
      {navbarItems.map((item) => (
        <Link key={item.id} href={item.path}>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === item.path && 'text-primary font-bold'
            }`}
          >
            <div className="flex gap-2">
              <item.icon /> {item.name}
            </div>
          </li>
        </Link>
      ))}
    </ul>
  ) : (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <ul className="flex justify-around bg-secondary w-full">
        {navbarItems.map((item) => (
          <Link key={item.id} href={item.path}>
            <li
              className={`flex gap-2 items-center font-medium p-5 hover:text-primary hover:font-bold transition-all cursor-pointer ${
                path === item.path && 'text-primary font-bold'
              }`}
            >
              <item.icon />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
