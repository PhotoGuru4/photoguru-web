import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@shared/components/common';

interface Props {
  onSend: (content: string) => void;
}

const MessageInput = ({ onSend }: Props) => {
  const [value, setValue] = useState('');

  const isDisabled = !value.trim();

  const handleSend = () => {
    if (isDisabled) return;
    onSend(value.trim());
    setValue('');
  };

  return (
    <div className="flex items-center gap-3 p-4 border-t border-gray-100">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 text-sm bg-gray-100 rounded-full outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />

      <Button
        onClick={handleSend}
        disabled={isDisabled}
        unstyled
        className="w-10 h-10 rounded-full bg-pink-500 text-white hover:bg-pink-600 disabled:bg-pink-300 disabled:opacity-60 flex items-center justify-center"
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default MessageInput;
