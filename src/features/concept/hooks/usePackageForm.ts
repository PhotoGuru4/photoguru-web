import { useState } from 'react';
import type { ConceptPackage } from '@features/concept/types/createConcept';
import { PACKAGE_TYPES } from '@shared/constants/packageType';
import { useProvincesQuery } from '@shared/hooks/queries/useProvincesQuery';
import { useWardsQuery } from '@shared/hooks/queries/useWardsQuery';

interface Props {
  onAdd: (pkg: ConceptPackage) => void;
}

export const usePackageForm = ({ onAdd }: Props) => {
  const [pkg, setPkg] = useState<ConceptPackage>({
    tier: PACKAGE_TYPES.BASIC,
    price: 0,
    estimatedDuration: 60,
    benefit: [],
    locations: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [benefitInput, setBenefitInput] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const { data: provinces } = useProvincesQuery();

  const { data: wards } = useWardsQuery(
    provinces?.find((p) => p.name === selectedProvince)?.code,
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!pkg.price || pkg.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!pkg.estimatedDuration || pkg.estimatedDuration <= 0) {
      newErrors.estimatedDuration = 'Duration must be greater than 0';
    }

    if (pkg.benefit.length === 0) {
      newErrors.benefit = 'At least one benefit required';
    }

    if (pkg.locations.length === 0) {
      newErrors.locations = 'At least one location required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addBenefit = () => {
    const value = benefitInput.trim();

    if (!value) {
      setErrors((prev) => ({
        ...prev,
        benefit: 'Benefit cannot be empty',
      }));
      return;
    }

    if (pkg.benefit.includes(value)) {
      setErrors((prev) => ({
        ...prev,
        benefit: 'This benefit already exists',
      }));
      return;
    }

    if (pkg.benefit.length >= 10) {
      setErrors((prev) => ({
        ...prev,
        benefit: 'Maximum 10 benefits allowed',
      }));
      return;
    }

    setPkg((prev) => ({
      ...prev,
      benefit: [...prev.benefit, value],
    }));

    setBenefitInput('');
    setErrors((prev) => ({ ...prev, benefit: '' }));
  };

  const removeBenefit = (index: number) => {
    setPkg((prev) => ({
      ...prev,
      benefit: prev.benefit.filter((_, i) => i !== index),
    }));
  };

  const addLocation = () => {
    if (!selectedProvince || !selectedWard) {
      setErrors((prev) => ({
        ...prev,
        locations: 'Please select province and ward',
      }));
      return;
    }

    const exists = pkg.locations.some(
      (loc) =>
        loc.province === selectedProvince &&
        loc.ward === selectedWard,
    );

    if (exists) return;

    setPkg((prev) => ({
      ...prev,
      locations: [
        ...prev.locations,
        { province: selectedProvince, ward: selectedWard },
      ],
    }));

    setSelectedProvince('');
    setSelectedWard('');
    setErrors((prev) => ({ ...prev, locations: '' }));
  };

  const removeLocation = (index: number) => {
    setPkg((prev) => ({
      ...prev,
      locations: prev.locations.filter((_, i) => i !== index),
    }));
  };

  const handleAddPackage = () => {
    if (!validate()) return;

    onAdd(pkg);

    setPkg((prev) => ({
      ...prev,
      price: 0,
      estimatedDuration: 60,
      benefit: [],
      locations: [],
    }));

    setErrors({});
  };

  return {
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
  };
};
