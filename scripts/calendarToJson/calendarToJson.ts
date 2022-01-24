import fs from 'fs';
import jsyaml from 'js-yaml';
import path from 'path';

const upToRoot = '../..';
const config = {
  dirname: path.resolve(__dirname, upToRoot, 'data'),
  countries: path.resolve(__dirname, upToRoot, 'data', 'countries'),
  types: {
    countryCodes: path.resolve(__dirname, upToRoot, 'src', 'types', 'generated'),
  },
  data: {
    export: path.resolve(__dirname, upToRoot, 'src', 'data'),
  },
};

const REGEX = /^([A-Z]+)\.yaml$/;

class CalendarToJson {
  private countryCodes: string[] = [];
  private namedays: DataArray[] = [];

  constructor(public opts = {}) {}
  /**
   * get list of countries from directory
   */
  getList() {
    const dirFiles = fs.readdirSync(config.countries);
    const filesPaths = dirFiles
      .reduce<string[]>((countryCodes, filePath) => {
        if (REGEX.test(filePath)) {
          const fileNameAsCountieCode = filePath.replace(REGEX, '$1');
          return [...countryCodes, fileNameAsCountieCode];
        }
        return countryCodes;
      }, [])
      .sort();

    if (!filesPaths.length) {
      console.error("Error: Resource directory is empty. Didn't find file that match.");
    }

    this.countryCodes = filesPaths;
    return this;
  }

  /**
   * load a single yaml file
   */
  private load(filename: string) {
    const data = fs.readFileSync(path.resolve(config.countries, filename + '.yaml'), 'utf8');
    try {
      const obj = jsyaml.load(data);
      if (typeof obj === 'object') {
        return obj;
      }
      return undefined;
    } catch (error) {
      console.error('Error: Some error while parsing .yaml file');
    }
  }

  /**
   * build `namedayCalendar.json file`
   */
  build() {
    const prepeardData: DataArray[] = this.countryCodes.map((code) => {
      const obj = this.load(code) as NamedayObject;
      return Object.entries(obj.namedays[code].days).reduce<DataArray>((all, day) => {
        const [date, names] = day;
        const [month] = date.split('-');
        return {
          ...all,
          [month]: {
            ...all[month],
            f: [
              {
                countrie: code,
                data: {
                  ...all[month]?.f[0]?.data,
                  [date]: names.filter((name) => name.sex !== 'M').map((i) => i.name),
                },
              },
            ],
            m: [
              {
                countrie: code,
                data: {
                  ...all[month]?.m[0]?.data,
                  [date]: names.filter((name) => name.sex !== 'F').map((i) => i.name),
                },
              },
            ],
          },
        };
      }, {});
    });
    this.namedays = prepeardData;
    return this;
  }

  /**
   * save nameday calenders
   */
  save() {
    this.generateTypes();
    this.generateData();
  }

  /**
   * generate types files for development
   */
  private generateTypes() {
    this.createFolderIfNotExist(path.resolve(config.types.countryCodes));
    fs.writeFileSync(
      path.resolve(config.types.countryCodes, 'countryCode.ts'),
      `export type CountryCode = ${this.countryCodes.map((code) => `'${code}'`).join(' | ')};\n` +
        `export enum ECountryCode {\n${this.countryCodes.map((code) => `  '${code}' = '${code}',`).join('\n')}\n}\n`,
      'utf8',
    );
    fs.writeFileSync(path.resolve(config.types.countryCodes, 'index.ts'), `export * from './countryCode';\n`);
  }

  /**
   * generate tree-shake data structure
   */
  private generateData() {
    this.createFolderIfNotExist(path.resolve(config.data.export));
    this.namedays.forEach((languageVersion) => {
      for (const month in languageVersion) {
        const dirToMonth = path.resolve(config.data.export, month);
        const dirToFemale = path.resolve(dirToMonth, 'f');
        const dirToMale = path.resolve(dirToMonth, 'm');
        [dirToMonth, dirToFemale, dirToMale].forEach((dir) => this.createFolderIfNotExist(dir));
        languageVersion[month].f.forEach((file) => {
          fs.writeFileSync(path.resolve(dirToFemale, `${file.countrie}.json`), JSON.stringify(file.data));
        });
        languageVersion[month].m.forEach((file) => {
          fs.writeFileSync(path.resolve(dirToMale, `${file.countrie}.json`), JSON.stringify(file.data));
        });
      }
    });
  }

  private createFolderIfNotExist(pathToDir: string) {
    if (!fs.existsSync(pathToDir)) {
      fs.mkdirSync(pathToDir);
    }
  }
}

new CalendarToJson().getList().build().save();

interface NamedayObject {
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

interface DataArray {
  [month: string]: {
    f: DataFile[];
    m: DataFile[];
  };
}

interface DataFile {
  countrie: string;
  data: { [date: string]: string[] };
}
