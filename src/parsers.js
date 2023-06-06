import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parsers = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

const getPath = (filePath) => path.resolve(process.cwd(), '__fixtures__', filePath);
const readFile = (fullPath) => fs.readFileSync(fullPath, 'UTF-8');

/* eslint-disable */
export default (filePath) => {
  const data = readFile(getPath(filePath));
  const getFileFormat = (filePath) => path.extname(filePath).slice(1);
  const format = getFileFormat(getPath(filePath));
  if (!parsers[format]) throw new Error('unknow file format');
  const outputObject = parsers[format](data);
  return outputObject;
};
