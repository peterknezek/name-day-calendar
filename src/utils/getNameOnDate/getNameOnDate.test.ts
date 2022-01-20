import { getNameOnDate } from './getNameOnDate';

describe('Defined path to .har', () => {
  it('Should be true', () => {
    expect(getNameOnDate()).toBe('Peter');
  });
});
