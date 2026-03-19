import { Heading } from '@shared/components/common/Heading';
import { Text } from '@shared/components/common/Text';
import { Button } from '@shared/components/common/Button';
import { X, Check, Clock, Wallet } from 'lucide-react';
import { formatVND } from '@shared/utils/formatVND';

interface Location {
  province: string;
  ward: string;
}

interface Package {
  tier: string;
  price: number;
  estimatedDuration: number;
  locations: Location[];
  benefit: string[];
}

interface Props {
  pkg: Package;
  onRemove?: () => void;
}

const PackageCard = ({ pkg, onRemove }: Props) => {
  return (
    <div className="border border-pink-200 bg-pink-50/40 rounded-2xl p-4 relative">
      {onRemove && (
        <Button
          variant="ghost"
          size="sm"
          icon={<X size={16} />}
          onClick={onRemove}
          className="absolute top-2 right-2 text-gray-400! hover:text-red-500!"
        />
      )}

      <Heading level={5} className="text-pink-600">
        {pkg.tier}
      </Heading>

      <div className="flex items-center gap-4 mt-2 text-gray-600 text-sm">
        <div className="flex items-center gap-1">
          <Wallet size={14} className="text-pink-500" />
          <span>{formatVND(pkg.price)}</span>
        </div>

        <div className="flex items-center gap-1">
          <Clock size={14} className="text-pink-500" />
          <span>{pkg.estimatedDuration} minutes</span>
        </div>
      </div>

      <div className="mt-3">
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Locations
        </Text>

        <div className="flex flex-wrap gap-2">
          {pkg.locations.map((loc, i) => (
            <span
              key={i}
              className="text-xs bg-white border border-pink-200 px-2 py-1 rounded-full"
            >
              {loc.province} / {loc.ward}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Benefits
        </Text>

        <div className="space-y-1">
          {pkg.benefit.map((b, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <Check size={14} className="text-pink-500" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
