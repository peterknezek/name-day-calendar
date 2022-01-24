import { extractDate } from './extractDate';

describe('Util extractDate()', () => {
  it('Should extract date form date format', () => {
    expect(extractDate(new Date(1988, 6, 30))).toEqual(['06', '30']);
  });
  it('Should extract date form string format', () => {
    expect(extractDate('06-30')).toEqual(['06', '30']);
  });
  it('Should throw error on wrong string format', () => {
    expect(() => {
      extractDate('30-06');
    }).toThrow();
  });
});
