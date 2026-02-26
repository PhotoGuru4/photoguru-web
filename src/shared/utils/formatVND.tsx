export const formatVND = (
  amount: number,
  compact: boolean = true,
  decimals: number = 1,
): string => {
  if (amount === 0) return '0 VND';

  const absAmount = Math.abs(amount);

  if (compact) {
    if (absAmount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000)
        .toFixed(decimals)
        .replace(/\.0+$/, '')}B VND`;
    }

    if (absAmount >= 1_000_000) {
      return `${(amount / 1_000_000)
        .toFixed(decimals)
        .replace(/\.0+$/, '')}M VND`;
    }

    if (absAmount >= 1_000) {
      return `${(amount / 1_000)
        .toFixed(decimals)
        .replace(/\.0+$/, '')}K VND`;
    }

    return `${amount} VND`;
  }

  return `${amount.toLocaleString('vi-VN')} VND`;
};
