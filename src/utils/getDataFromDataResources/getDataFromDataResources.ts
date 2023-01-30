import mergeWith from 'lodash.mergewith';

import { dataLoader } from '../../loaders.generated';
import type { ISearchParams, TFileContent } from '../../types';

export const customizerMergeOfCalendars = (objValue: string[], srcValue: string[]) => {
  if (Array.isArray(objValue)) {
    return [...srcValue, ...objValue];
  }
};

/**
 *  Get data from data resources (files in `data` folder) and merge them.
 */
export const getDataFromDataResources = async (params: ISearchParams[]): Promise<TFileContent | undefined> => {
  return Promise.all(
    params.map(({ lang, sex, month }) => {
      return dataLoader({ lang, sex, month });
    }),
  ).then((calendars) => {
    return calendars.reduce<TFileContent>((acc, curr) => {
      return mergeWith(acc, curr, customizerMergeOfCalendars);
    }, {} as TFileContent);
  });
};
