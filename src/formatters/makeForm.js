/* eslint-disable import/extensions */
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (format, tree) => {
  switch (format) {
    case 'stylish': return stylish(tree);
    case 'json': return json(tree);
    case 'plain': return plain(tree);
    default:
      throw new Error('Unknown format');
  }
};
