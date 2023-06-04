import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';
import findDifferences from './src/findDifferences.js';

export default (filePath1, filePath2, format) => {
  const tree = findDifferences(filePath1, filePath2);
  switch (format) {
    case 'stylish': return stylish(filePath1, filePath2);
    case 'json': return json(tree);
    case 'plain': return plain(tree);
    default:
      return stylish(tree);
  }
};
