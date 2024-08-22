import React from 'react';

import UpgradeItemCard from './UpgradeItemCard';

const UpgradeList = () => {
  const upgradeItemList = [
    {
      tier: 'Monthly',
      price: '$10/month',
      perks: [
        '✅ 10 Free Mock Interviews',
        '✅ 10 chances to retake interviews',
        '❌ Practice Questions',
        '❌ Discord Access with thousands of fellow members'
      ],
      link: 'https://buy.stripe.com/test_4gwbJk8XG6aOfjGcMN'
    },
    {
      tier: 'Yearly',
      price: '$100/year',
      perks: [
        '✅ Unlimited Free Mock Interviews',
        '✅ Unlimited chances to retake interviews',
        '✅ Practice Questions',
        '✅ Discord Access with thousands of fellow members'
      ],
      link: 'https://buy.stripe.com/test_aEU5kW5Lu7eSefCfYY'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-20">
      {upgradeItemList.map((u, i) => (
        <UpgradeItemCard key={i} upgradeItem={u} />
      ))}
    </div>
  );
};

export default UpgradeList;
