import { describe, expect, it } from 'vitest';

import { extractDate } from './extractDate';

describe('Util extractDate()', () => {
  it('Should extract date form date format', () => {
    expect(extractDate(new Date(2000, 0, 20))).toEqual([1, 20]);
  });
  it('Should extract date form string format', () => {
    expect(extractDate('1-20')).toEqual([1, 20]);
  });
});
