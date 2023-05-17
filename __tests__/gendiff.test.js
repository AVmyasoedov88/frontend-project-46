import genDiff from "../src/index.js";

import { fileURLToPath } from 'url';
import path from 'path';
const equal = [
    '"{\\n- follow: false\\n  host: hexlet.io\\n- proxy: 123.234.53.22\\n- timeout: 50\\n+ timeout: 20\\n+ verbose: true\\n}"'
  ]
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const path1 = getFixturePath('file1.json')
const path2 = getFixturePath('file2.json')
const path1Yml = getFixturePath('file1.yml')
const path2Yml = getFixturePath('file2.yml')

test('toEqual with objects', () => {
    const result = genDiff(path1, path2)
    const x = JSON.stringify(result)
    expect(x.split()).toEqual(equal)
})

test('toEqual with objects yml', () => {
  const result = genDiff(path1Yml, path2Yml)
  const x = JSON.stringify(result)
  expect(x.split()).toEqual(equal)
})