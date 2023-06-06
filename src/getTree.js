import _ from 'lodash';

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

    if (obj1[key] === obj2[key]) {
      return {
        key,
        value: obj1[key],
        status: 'unchanged',
      };
    }

    return {
      key,
      value: obj1[key],
      value2: obj2[key],
      status: 'changed',
    };
  });
}

export default getTree;
