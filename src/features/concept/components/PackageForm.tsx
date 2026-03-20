import { Input } from '@shared/components/common/Input';
import { Text } from '@shared/components/common/Text';
import { Button } from '@shared/components/common/Button';
import { Plus, X, Check } from 'lucide-react';
import { PACKAGE_TYPES, type PackageType } from '@shared/constants/packageType';
import { usePackageForm } from '@features/concept/hooks/usePackageForm';
import { useEffect, useState } from 'react';
import type { ConceptPackage } from '@features/concept/types/createConcept';
import { formatCurrency, parseCurrency } from '@shared/utils/formatCurrency';

interface Props {
  onAdd: (pkg: ConceptPackage) => void;
  existingPackages: ConceptPackage[];
}

const PackageForm = ({ onAdd, existingPackages }: Props) => {
  const {
    pkg,
    setPkg,
    benefitInput,
    setBenefitInput,
    selectedProvince,
    setSelectedProvince,
    selectedWard,
    setSelectedWard,
    provinces,
    wards,
    errors,
    addBenefit,
    removeBenefit,
    addLocation,
    removeLocation,
    handleAddPackage,
  } = usePackageForm({ onAdd });

  const [priceDisplay, setPriceDisplay] = useState('');
  const [durationDisplay, setDurationDisplay] = useState('');

  const availableTiers = Object.values(PACKAGE_TYPES).filter(
    (t) => !existingPackages.some((p) => p.tier === t),
  );

  useEffect(() => {
    if (availableTiers.length > 0 && !availableTiers.includes(pkg.tier)) {
      setPkg((prev) => ({
        ...prev,
        tier: availableTiers[0],
      }));
    }
  }, [availableTiers, pkg.tier, setPkg]);

  useEffect(() => {
    setPriceDisplay(formatCurrency(pkg.price));
  }, [pkg.price]);

  useEffect(() => {
    setDurationDisplay(formatCurrency(pkg.estimatedDuration));
  }, [pkg.estimatedDuration]);

  const selectClass =
    'w-full px-4 py-1.5 text-sm border border-gray-300 rounded-md ' +
    'focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-400 ' +
    'bg-white appearance-none transition-all';

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <Text className="text-lg font-semibold mb-5">
        Add New Package
      </Text>

      <div className="space-y-5">
        <div>
          <Text className="text-sm text-gray-600 mb-1">Package Type</Text>
          <select
            className={selectClass}
            value={pkg.tier}
            onChange={(e) =>
              setPkg({ ...pkg, tier: e.target.value as PackageType })
            }
            disabled={availableTiers.length === 0}
          >
            {availableTiers.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <Input
          label="Duration (Minutes)"
          value={durationDisplay}
          onChange={(e) => {
            const raw = parseCurrency(e.target.value);
            setPkg({
              ...pkg,
              estimatedDuration: raw,
            });
            setDurationDisplay(formatCurrency(raw));
          }}
          error={errors.estimatedDuration}
        />

        <Input
          label="Price (VND)"
          value={priceDisplay}
          onChange={(e) => {
            const raw = parseCurrency(e.target.value);
            setPkg({ ...pkg, price: raw });
            setPriceDisplay(formatCurrency(raw));
          }}
          error={errors.price}
        />

        <div>
          <Text className="text-sm text-gray-600 mb-2">Locations</Text>

          <div className="grid grid-cols-2 gap-3">
            <select
              className={selectClass}
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setSelectedWard('');
              }}
            >
              <option value="">Province</option>
              {provinces?.map((p) => (
                <option key={p.code}>{p.name}</option>
              ))}
            </select>

            <select
              className={selectClass}
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Ward</option>
              {wards?.map((w) => (
                <option key={w.code}>{w.name}</option>
              ))}
            </select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            icon={<Plus size={14} />}
            onClick={addLocation}
            className="mt-2 text-red-500! hover:bg-red-50!"
          >
            Add Location
          </Button>

          {errors.locations && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.locations}
            </Text>
          )}

          <div className="mt-3 space-y-2">
            {pkg.locations.map((loc, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg"
              >
                <span className="text-sm">
                  {loc.province} / {loc.ward}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  icon={<X size={14} />}
                  onClick={() => removeLocation(i)}
                  className="p-1! text-gray-400! hover:text-red-500!"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Text className="text-sm text-gray-600 mb-2">Benefits</Text>

          <Input
            placeholder="e.g. Online gallery"
            value={benefitInput}
            onChange={(e) => setBenefitInput(e.target.value)}
          />

          <Button
            variant="ghost"
            size="sm"
            icon={<Plus size={14} />}
            onClick={addBenefit}
            className="mt-2 text-red-500! hover:bg-red-50!"
          >
            Add Benefit
          </Button>

          {errors.benefit && (
            <Text className="text-red-500 text-xs mt-1">
              {errors.benefit}
            </Text>
          )}

          <div className="flex flex-wrap gap-2 mt-3">
            {pkg.benefit.map((b, i) => (
              <div
                key={i}
                className="bg-gray-100 px-2 py-1 rounded-lg text-sm flex items-center gap-4"
              >
                {b}
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<X size={14} />}
                  onClick={() => removeBenefit(i)}
                  className="p-1! text-gray-400! hover:text-red-500!"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <Button
          variant="outline"
          size="md"
          icon={<X size={18} />}
          className="p-2! rounded-full border-red-400! text-red-500!"
        />

        <Button
          variant="outline"
          size="md"
          icon={<Check size={18} />}
          onClick={handleAddPackage}
          className="p-2! rounded-full border-green-500! text-green-500!"
        />
      </div>
    </div>
  );
};

export default PackageForm;
