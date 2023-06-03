import _ from 'lodash';
import parse from './parsers.js';

function getTree(obj1, obj2) {
  const keys = _.uniq([...(Object.keys(obj1)), ...(Object.keys(obj2))]);
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    if (!_.has(obj2, key)) {
      return {
        key,
        value: obj1[key],
        status: 'deleted',
      };
    }

    if (!_.has(obj1, key)) {
      return {
        key,
        value: obj2[key],
        status: 'added',
      };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        key,
        children: getTree(obj1[key], obj2[key]),
        status: 'nested',
      };
    }

    return obj1[key] === obj2[key] ? { key, value: obj1[key], status: 'unchanged' } : { 
        key, value: obj1[key], value2: obj2[key], status: 'changed' 
    };
  });
}

const findDifferences = (filePath1, filePath2) => {
  const object1 = parse(filePath1);
  const object2 = parse(filePath2);
  const tree = getTree(object1, object2);
  return tree;
};

export default findDifferences;
