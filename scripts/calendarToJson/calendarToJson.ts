import fs from 'fs';
import jsyaml from 'js-yaml';
import path from 'path';

const config = {
  dirname: path.resolve(__dirname, '..', '..', 'data'),
  countries: path.resolve(__dirname, '..', '..', 'data', 'countries'),
};

const REGEX = /^([A-Z]+)\.yaml$/;

class CalendarToJson {
  private list: string[] = [];
  private namedays: string[] = [];

  constructor(public opts = {}) {}
  /**
   * get list of countries from directory
   */
  getList() {
    const dirFiles = fs.readdirSync(config.countries);
    const filesPaths = dirFiles
      .reduce<string[]>((allPats, filePath) => {
        if (REGEX.test(filePath)) {
          const fileNameAsCountieCode = filePath.replace(REGEX, '$1');
          return [...allPats, fileNameAsCountieCode];
        }
        return allPats;
      }, [])
      .sort();

    if (filesPaths.length) {
      console.error("Error: Resource directory is empty. Didn't find file that match.");
    }
    this.list = filesPaths;
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
    const obj = this.load('SK');
    console.log(JSON.stringify(obj, undefined, 2));
    return this;
  }
  /**
   * save nameday calenders
   */
  save() {
    const json = JSON.stringify(this.namedays, null, 2) + '\n';
    fs.writeFileSync(path.resolve(config.dirname, 'namedays.json'), json, 'utf8');
  }
}

new CalendarToJson().getList().build();
