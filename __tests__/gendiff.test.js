/* eslint-disable no-undef, no-underscore-dangle */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import diff from '../index';

const getFixturePath = (filename) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return path.join(__dirname, '..', '__fixtures__', filename);
};

describe.each([
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  ['file1.yml', 'file2.yml'],
])('displaying file in differences form', (filePath1, filePath2) => {
  test('displaying file differences in stylish form', () => {
    const stylishResultData = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
    expect(diff(filePath1, filePath2, 'stylish')).toEqual(stylishResultData);
  });
  test('displaying file differences in plain form', () => {
    const plainhResultData = fs.readFileSync(getFixturePath('plainhResult.txt'), 'utf-8');
    expect(diff(filePath1, filePath2, 'plain')).toEqual(plainhResultData);
  });
  test('displaying file differences in json form', () => {
    const jsonResultData = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');
    expect(diff(filePath1, filePath2, 'json')).toEqual(jsonResultData);
  });
});

