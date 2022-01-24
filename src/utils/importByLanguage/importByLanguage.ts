import type { CountryCode, DefaultExport } from '../../types';
import { isNotEmpty } from '../isNotEmpty';

/**
 * Get file content for every CountryCode
 * @param path to json file
 * @param lang one or array of CountryCodes
 * @returns array of file contents
 */
export const importByLanguage = async <C>(path: string, lang: CountryCode | CountryCode[]): Promise<C[]> => {
  if (Array.isArray(lang)) {
    const filesList = lang
      .map((code) => import(`${path}/${code}.json`) as Promise<DefaultExport<C>>, {})
      .filter(isNotEmpty);
    const filesData = await Promise.all(filesList);
    return filesData.map((i) => i.default);
  }

  const fileContent = (await import(`${path}/${lang}.json`)) as DefaultExport<C>;
  return [fileContent.default];
};
