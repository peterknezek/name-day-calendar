import { importByLanguage } from './importByLanguage';
import testData from './test/SK.json';

describe('Util importByLanguage', () => {
  it('Should return data from all languages', async () => {
    expect(await importByLanguage('./test', ['SK'])).toEqual([testData]);
  });
  it('Should return data from language', async () => {
    expect(await importByLanguage('./test', 'SK')).toEqual([testData]);
  });
});
