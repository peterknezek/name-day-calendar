import { toStringDigit } from './toStringDigit';

describe('Util toStringDigit()', () => {
  it('Should make 01 form 1', () => {
    expect(toStringDigit(1)).toBe('01');
  });
  it('Should make string 10 from number 10', () => {
    expect(toStringDigit(10)).toBe('10');
  });
});
