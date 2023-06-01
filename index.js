import stylish from "./src/formatters/stylish.js";
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';
import findDifferences from "./src/findDifferences.js";

/*const formatters = {
  plain,
  stylish,
  json,
  
};

export default (tree, formatter) => {
  //if (!formatters[formatter]) throw new Error(`error: option '-f, --format <type>' argument '${formatter}' is invalid. Allowed choices are stylish, plain, json.`);
  console.log(typeof formatters[formatter](tree))
  return formatters[formatter](tree);
};*/

export default (filePath1, filePath2, format) => {
  const tree = findDifferences(filePath1, filePath2)
  switch (format) {
    case "stylish": return stylish(tree);
    case "json": return json(tree);
    case "plain": return plain(tree)
    //default:
      //throw new Error('ERROR');
  }
}

