import { DEFAULT_IMAGES } from '@shared/constants';
import { Heading } from '@shared/components/common/Heading';
import { getSafeImage } from '@shared/utils/safeImage';

interface Props {
  name: string;
  avatar: string;
}

const ChatHeader = ({ name, avatar }: Props) => {
  return (
    <div className="flex items-center gap-3 p-4 border-b border-gray-100">
      <img
        src={getSafeImage(avatar, DEFAULT_IMAGES.DEFAULT_AVATAR)}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_IMAGES.DEFAULT_AVATAR;
        }}
        className="w-10 h-10 rounded-full object-cover"
        alt="avatar"
      />
      <Heading level={5}>{name}</Heading>
    </div>
  );
};

export default ChatHeader;
