import {
  ImagePlusIcon,
  CalendarCheckIcon,
  MessageCircleIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Text, Heading } from '@shared/components/common';
import { ROUTES } from '@shared/constants/routes';

const quickActions = [
  {
    label: 'Concept Management',
    icon: ImagePlusIcon,
    path: ROUTES.CONCEPT,
  },
  {
    label: 'Booking Management',
    icon: CalendarCheckIcon,
    path: ROUTES.BOOKING,
  },
  {
    label: 'Messages Management',
    icon: MessageCircleIcon,
    path: ROUTES.MESSAGES,
  },
];

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Heading level={4} className="mb-6">
        Quick Actions
      </Heading>

      <div className="grid grid-cols-3 gap-8">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.label}
              onClick={() => navigate(action.path)}
              className="
                group
                flex flex-col items-center gap-4
                rounded-2xl bg-white p-8
                shadow-sm transition-all duration-200
                hover:shadow-md hover:-translate-y-1
                cursor-pointer
              "
            >
              <div className="
                flex h-14 w-14 items-center justify-center
                rounded-full bg-pink-100 text-pink-500
                transition group-hover:bg-pink-500 group-hover:text-white
              ">
                <Icon className="size-6" strokeWidth={1.5} />
              </div>

              <Text variant="body" align="center">
                {action.label}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardQuickActions;
