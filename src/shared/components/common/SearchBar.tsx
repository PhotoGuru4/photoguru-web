import { Search } from 'lucide-react';
import clsx from 'clsx';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        'w-full rounded-xl border border-gray-200',
        'bg-white px-4 py-2',
        'focus-within:border-pink-400 focus-within:ring-1 focus-within:ring-pink-300',
        className,
      )}
    >
      <Search className="h-5 w-5 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full bg-transparent outline-none
          text-sm text-gray-700
          placeholder:text-gray-400
        "
      />
    </div>
  );
};
