import { Day, Month, TStringDate } from '../../../../types';

export const extractDate = (date: TStringDate | Date): [Month, Day] => {
  if (date instanceof Date) {
    const [month, day] = [date.getMonth() as Month, date.getDate() as Day];
    return [month, day];
  }

  const [month, day] = date.split('-');
  return [+month, +day] as [Month, Day];
};
