import { ChevronsUp } from 'lucide-react';
import { Button, Text } from '@shared/components/common';

type Props = {
  unreadCount: number;
  onPress: () => void;
};

const UnreadButton = ({ unreadCount, onPress }: Props) => {
  if (unreadCount <= 0) return null;

  return (
    <div className="absolute right-6 bottom-24 flex flex-col items-center">
      <Button
        onClick={onPress}
        unstyled
        className="
          bg-white w-10 h-10 rounded-full
          flex items-center justify-center
          border border-gray-200
          shadow-sm
          hover:shadow-md
        "
      >
        <ChevronsUp size={20} className="text-gray-600" />
      </Button>

      <div className="bg-pink-500 px-2 py-0.5 rounded-full mt-1 min-w-5">
        <Text
          variant="small"
          color="white"
          align="center"
          className="font-bold"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Text>
      </div>
    </div>
  );
};

export default UnreadButton;
