import type { CountryCode, IFileContent } from '../../types';
import { ECountryCode } from '../../types';
import { importByLanguage } from '../../utils';
import { extractDate } from './utils';

interface SearchOptions {
  lang?: CountryCode | CountryCode[];
  sex?: 'male' | 'female';
}

export const getNameOnDate = async (date: string | Date, options?: SearchOptions) => {
  const lang = options?.lang ?? Object.values(ECountryCode);
  const [month, day] = extractDate(date);

  let paths: string[] = [];
  if (options?.sex) {
    if (options.sex === 'male') {
      paths = [`../../data/${month}/m`];
    }
    if (options.sex === 'female') {
      paths = [`../../data/${month}/f`];
    }
  } else {
    paths = [`../../data/${month}/f`, `../../data/${month}/m`];
  }

  // list of relevant genders and the relevant name days in a countries
  const data = await Promise.all(paths.map((path) => importByLanguage<IFileContent>(path, lang)));

  return data.reduce<string[]>((names, gender) => {
    return [
      ...names,
      ...gender.reduce<string[]>(
        (namesInCountry, namedaysOfCountrie) => [...namesInCountry, ...namedaysOfCountrie[`${month}-${day}`]],
        [],
      ),
    ];
  }, []);
};
