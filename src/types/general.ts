import type { Month } from './calendar';
import type { CountryCode } from './generated';

/**
 * Type util for optional properties
 */
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type TSex = 'male' | 'female';

export interface ISearchParams {
  lang: CountryCode;
  sex: TSex;
  month: Month;
}
