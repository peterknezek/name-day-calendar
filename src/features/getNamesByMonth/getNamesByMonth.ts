import { ISearchParams, Optional } from '../../types';
import { defineDataLoaderParams, getDataFromDataResources } from '../../utils';

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

export const getNamesByMonth = async (options: Optional<ISearchParams, 'lang' | 'sex'>) => {
  return await processChain().defineDataForLoader(options).getDataFromResources();
};
