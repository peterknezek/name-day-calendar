import { ECountryCode, ISearchParams, Optional } from '../../types';

/**
 * Process object with params to the array of parames where optional values are replaced by all possible values
 * @param params object with optional values
 * @returns array of params for `dataLoader`
 */
export const defineDataLoaderParams = (params: Optional<ISearchParams, 'lang' | 'sex'>): ISearchParams[] => {
  const { month, lang, sex } = params;
  const countries = lang ? [lang] : Object.values(ECountryCode);

  return countries.reduce<ISearchParams[]>((all, lang) => {
    if (sex === undefined) {
      return [...all, { lang, month, sex: 'female' }, { lang, month, sex: 'male' }];
    }
    return [...all, { lang, month, sex }];
  }, []);
};
