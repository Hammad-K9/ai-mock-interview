import React from 'react';
import { usePathname } from 'next/navigation';
import { Layout, CircleHelp, ShieldPlus, Sparkle } from 'lucide-react';
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
      name: 'Questions',
      icon: CircleHelp,
      path: '/dashboard/questions'
    },
    {
      id: 2,
      name: 'Upgrade',
      icon: ShieldPlus,
      path: '/dashboard/upgrade'
    },
    {
      id: 3,
      name: 'How It Works',
      icon: Sparkle,
      path: '/dashboard/howitworks'
    }
  ];
  return width >= 768 ? (
    <ul className="flex gap-6">
      {navbarItems.map((item) => (
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === item.path && 'text-primary font-bold'
          }`}
        >
          <div className="flex gap-2">
            <item.icon /> {item.name}
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="fixed bottom-0 left-0 right-0 z-10">
      <ul className="flex justify-around bg-secondary w-full">
        {navbarItems.map((item) => (
          <li
            className={`flex gap-2 items-center font-medium p-5 hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === item.path && 'text-primary font-bold'
            }`}
          >
            <item.icon />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
