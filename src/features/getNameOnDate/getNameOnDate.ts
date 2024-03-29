import type { ISearchParams, Optional, TStringDate } from '../../types';
import { defineDataLoaderParams, getDataFromDataResources } from '../../utils';
import { extractDate } from './utils';

function processChain() {
  return {
    params: [] as ISearchParams[], // = defineDataLoaderParams(options);
    /**
     * Process object with params to the array of parames where optional values are replaced by all possible values
     * @param params object with optional values
     * @returns array of params for next step `getDataFromResources`
     */
    defineDataForLoader: function (params: Optional<ISearchParams, 'lang' | 'sex'>) {
      this.params = defineDataLoaderParams(params);
      return this;
    },
    /**
     * Get data from data resources (files in `data` folder)
     * @returns data from data resources
     */
    getDataFromResources: async function () {
      return await getDataFromDataResources(this.params);
    },
  };
}

export const getNameOnDate = async (
  date: TStringDate | Date,
  options?: Partial<Pick<ISearchParams, 'lang' | 'sex'>>,
) => {
  const [month, day] = extractDate(date);

  const names = await processChain()
    .defineDataForLoader({ month, ...options })
    .getDataFromResources();

  const keyDate: TStringDate = `${month}-${day}`;
  return names?.[keyDate];
};
