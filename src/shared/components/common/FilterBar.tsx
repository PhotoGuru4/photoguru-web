import clsx from 'clsx';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  className?: string;
}

export const FilterSelect = ({
  value,
  options,
  onChange,
  className,
}: FilterSelectProps) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={clsx(
        'rounded-xl border border-gray-200 bg-white',
        'px-4 py-2 text-sm text-gray-700',
        'focus:border-pink-400 focus:ring-1 focus:ring-pink-300',
        className,
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};
