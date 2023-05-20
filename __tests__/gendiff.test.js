import findDifferences from '../src/findDifferences';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
///import genDiff from '../index.js';


  const getFixturePath = (filename) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return path.join(__dirname, '..', '__fixtures__', filename);
  }
  const jsonPath1 = getFixturePath('file1.json');
  const jsonPath2 = getFixturePath('file2.json');
  const yamlPath1 = getFixturePath('file1.yml');
  const ymlPath2 = getFixturePath('file2.yml');

  const stylishResult = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;


  test('displaying file differences in stylish form', () => {
    expect(findDifferences(jsonPath1, jsonPath2, 'stylish')).toBe(stylishResult);
    expect(findDifferences(yamlPath1, ymlPath2, 'stylish')).toBe(stylishResult);
  });  

/*test('toEqual with plain objects', () => {
    const result = findDifferences(path1, path2)
    const x = JSON.stringify(result)
    expect(x.split()).toEqual(equal)
})

test('toEqual with plain objects yml', () => {
  const result = findDifferences(path1Yml, path2Yml)
  const x = JSON.stringify(result)
  expect(x.split()).toEqual(equal)
})*/
