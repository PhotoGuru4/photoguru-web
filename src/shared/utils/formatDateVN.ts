import dayjs from 'dayjs';

export const formatDateVN = (dateStr: string) => {
  const date = dayjs(dateStr);

  if (!date.isValid()) return 'NAN';

  return date.format('DD/MM/YYYY');
};
