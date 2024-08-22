import React from 'react';

import UpgradeList from '@/components/UpgradeList';

const Upgrade = () => (
  <div className="flex flex-col justify-center items-center p-5 mb-20">
    <h2 className="font-bold text-2xl">Upgrade</h2>
    <h2 className="text-gray-500">
      Upgrade to the monthly plan to access unlimited AI Mock Interviews!
    </h2>
    <UpgradeList />
  </div>
);

export default Upgrade;
