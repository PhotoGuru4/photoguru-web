import { formatVND } from '@shared/utils/formatVND';
import { Text, Heading } from '@shared/components/common';

import type { DashboardEarnings } from '@features/dashboard/types/summary';

const DashboardStats = ({
  today,
  thisMonth,
}: DashboardEarnings) => {
  return (
    <div className="grid grid-cols-2 gap-6">

      <div className="rounded-2xl bg-pink-50 p-6 shadow-sm">
        <Text
          variant="caption"
          color="default"
        >
          Today's Earnings
        </Text>

        <Heading
          level={3}
          color="pink"
          className="mt-2"
        >
          {today !== undefined ? formatVND(today, true, 1) : 0}
        </Heading>
      </div>

      <div className="rounded-2xl bg-pink-50 p-6 shadow-sm">
        <Text
          variant="caption"
          color="default"
        >
          This Month
        </Text>

        <Heading
          level={3}
          color="pink"
          className="mt-2"
        >
          {thisMonth !== undefined ? formatVND(thisMonth, true, 1) : 0}
        </Heading>
      </div>

    </div>
  );
};

export default DashboardStats;
