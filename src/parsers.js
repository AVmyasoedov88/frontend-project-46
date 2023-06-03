import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};
/* eslint-disable */
export default (filePath) => {
  const getPath = (filePath) => path.resolve(process.cwd(), '__fixtures__', filePath);
  const readFile = (fullPath) => fs.readFileSync(fullPath, 'UTF-8');
  const data = readFile(getPath(filePath));
  const getFileFormat = (filePath) => path.extname(filePath).slice(1);
  const format = getFileFormat(getPath(filePath));
  if (!parsers[format]) throw new Error('unknow file format');
  const outputObject = parsers[format](data);
  if (!_.isPlainObject(outputObject)) throw new Error('Failed correctly to parse files.');
  return outputObject;
};
