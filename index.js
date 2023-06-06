/* eslint-disable import/extensions */
import makeForm from './src/formatters/makeForm.js';
import getTree from './src/getTree.js';
import parse from './src/parsers.js';

export default (filePath1, filePath2, format = 'stylish') => {
  const object1 = parse(filePath1);
  const object2 = parse(filePath2);
  const tree = getTree(object1, object2);
  return makeForm(format, tree);
};
