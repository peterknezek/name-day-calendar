import mergeWith from 'lodash.mergewith';
import { describe, expect, test } from 'vitest';

import namedays_f from '../../data/6/f/SK.json';
import namedays_m from '../../data/6/m/SK.json';
import { customizerMergeOfCalendars } from '../../utils';
import { getNamesByMonth } from './getNamesByMonth';

describe('Feature getNamesByMonth()', () => {
  describe('Should return names', () => {
    test('with all options', async () => {
      expect(await getNamesByMonth({ lang: 'SK', month: 6, sex: 'male' })).toEqual(namedays_m);
      expect(await getNamesByMonth({ lang: 'SK', month: 6, sex: 'female' })).toEqual(namedays_f);
    });
    test('without a gender', async () => {
      expect(await getNamesByMonth({ lang: 'SK', month: 6 })).toEqual(
        mergeWith(namedays_f, namedays_m, customizerMergeOfCalendars),
      );
    });
    test('without a gender and language', async () => {
      expect(await getNamesByMonth({ month: 6 })).toEqual(
        mergeWith(namedays_f, namedays_m, customizerMergeOfCalendars),
      );
    });
  });
});
