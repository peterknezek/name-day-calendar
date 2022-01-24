import { toStringDigit } from '../../../../utils';

export const extractDate = (date: string | Date): [string, string] => {
  if (date instanceof Date) {
    const [month, day] = [date.getMonth(), date.getDate()];
    return [toStringDigit(month), toStringDigit(day)];
  }

  const regex = /[0-1][0-9]-[0-3][0-9]/s;
  if (!regex.test(date)) {
    throw new Error('Date is in wrong format. Use MM-DD');
  }
  const [month, day] = date.split('-');
  return [month, day];
};
