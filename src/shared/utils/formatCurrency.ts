export const formatCurrency = (value: number | string) => {
  if (value === null || value === undefined || value === '') return '';

  const numberValue =
    typeof value === 'string'
      ? Number(value.replace(/\D/g, ''))
      : value;

  if (isNaN(numberValue)) return '';

  return numberValue.toLocaleString('vi-VN');
};

export const parseCurrency = (value: string) => {
  if (!value) return 0;
  return Number(value.replace(/\./g, '').replace(/\D/g, ''));
};
