export interface NamedayObject {
  namedays: {
    [countrieCode: string]: {
      countrie: {
        sk: string;
        en: string;
      };
      days: {
        [date: string]: {
          name: string;
          sex: 'M' | 'F' | 'B';
        }[];
      };
    };
  };
}

export interface DataArray {
  [month: string]: {
    f: DataFile[];
    m: DataFile[];
  };
}

export interface DataFile {
  countrie: string;
  data: { [date: string]: string[] };
}
