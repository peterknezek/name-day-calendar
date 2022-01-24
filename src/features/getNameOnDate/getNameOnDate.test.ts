import { getNameOnDate } from './getNameOnDate';
import namedays_f from '../../data/06/f/SK.json';
import namedays_m from '../../data/06/m/SK.json';

describe('Feature getNameOnDate()', () => {
  describe('Should return name if date is provided as string', () => {
    test('without options', async () => {
      expect(await getNameOnDate('06-29')).toEqual([...namedays_f['06-29'], ...namedays_m['06-29']]);
    });
    test('with option defined specific language and sex', async () => {
      expect(await getNameOnDate('06-29', { lang: 'SK', sex: 'female' })).toEqual(namedays_f['06-29']);
    });
  });
  describe('Should return date if in date format', () => {
    test('without options', async () => {
      const date = new Date(1988, 6, 29);
      expect(await getNameOnDate(date)).toEqual([...namedays_f['06-29'], ...namedays_m['06-29']]);
    });
    test('with option defined specific language and sex', async () => {
      const date = new Date(1988, 6, 29);
      expect(await getNameOnDate(date, { lang: 'SK', sex: 'male' })).toEqual(namedays_m['06-29']);
    });
  });
});
