import { describe, expect, test } from 'vitest';

import namedays_f from '../../data/6/f/SK.json';
import namedays_m from '../../data/6/m/SK.json';
import { getNameOnDate } from './getNameOnDate';

describe('Should return name if date is provided as string', () => {
  test('without options', async () => {
    expect(await getNameOnDate('6-29')).toEqual(['Peter', 'Pavol', 'Petra']);
  });
  test('with option defined specific language and sex', async () => {
    expect(await getNameOnDate('6-29', { lang: 'SK', sex: 'female' })).toEqual(namedays_f['6-29']);
  });
});

describe('Should return date if in date format', () => {
  test('without options', async () => {
    // Months are 0-indexed in JS
    const date = new Date(1988, 5, 29);
    expect(await getNameOnDate(date)).toEqual(['Peter', 'Pavol', 'Petra']);
  });
  test('with option defined specific language and sex', async () => {
    // Months are 0-indexed in JS
    const date = new Date(1988, 5, 29);
    expect(await getNameOnDate(date, { lang: 'SK', sex: 'male' })).toEqual(namedays_m['6-29']);
  });
});
