import stylish from "./src/formatters/stylish.js";
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';

const formatters = {
  plain,
  stylish,
  json,
  
};

export default (tree, formatter) => {
  if (!formatters[formatter]) throw new Error(`error: option '-f, --format <type>' argument '${formatter}' is invalid. Allowed choices are stylish, plain, json.`);
  
  return formatters[formatter](tree);
};