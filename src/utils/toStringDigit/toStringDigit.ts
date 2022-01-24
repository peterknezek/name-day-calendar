/**
 * Transfer number to two digit string.
 * @returns 1 => "01" || 12 => "12"
 * @example toStringDigit(1) // returns "01"
 */
export const toStringDigit = (number: number): string => {
  return number >= 10 ? `${number}` : `0${number}`;
};
