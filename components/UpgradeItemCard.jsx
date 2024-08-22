import React from 'react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

const UpgradeItemCard = ({ upgradeItem }) => (
  <div className="flex flex-col justify-between border shadow-sm rounded-xl p-3">
    <div className="flex flex-col items-center">
      <h2 className="text-xl mt-5">{upgradeItem.tier}</h2>
      <h2
        className={`text-3xl my-5 ${upgradeItem.tier === 'Yearly' ? 'text-yellow-500' : 'text-red-600'}`}
      >
        <strong>{upgradeItem.price}</strong>
      </h2>
      <div className="p-5 max-w-[300px]">
        {upgradeItem.perks.map((p, i) => (
          <h2 key={i} className="my-1">
            {p}
          </h2>
        ))}
      </div>
    </div>
    <div>
      <Link href={upgradeItem.link} className="w-full">
        <Button variant="custom" className="border w-full rounded-full">
          Get Started
        </Button>
      </Link>
    </div>
  </div>
);

export default UpgradeItemCard;
