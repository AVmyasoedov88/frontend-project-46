import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';


class JsonParser {
    parse(data) {
      return JSON.parse(data);
    }
  }

  class YamlParser {
    parse(data) {
      return yaml.load(data);
    }
  }
  const mapping = {
    yaml: YamlParser,
    yml: YamlParser,
    json: JsonParser,
  };
  
  const getPath = (filePath) => path.resolve(process.cwd(), '__fixtures__', filePath);
  
  export default class ConfigFactory {
    static factory(str) {
        const filePath = getPath(str)
        const type = path.extname(filePath).slice(1);
        const parser =  new mapping[type]();
        const rawData = fs.readFileSync(filePath).toString();
      const data = parser.parse(rawData);
  
      return data;
    }
  }


