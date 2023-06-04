import _ from 'lodash';

const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat((depth + 1) * spacesCount);
const getBracketIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(depth * spacesCount);

const getValue = (currentValue, depth) => {
  if (!_.isObject(currentValue)) {
    return `${currentValue}`;
  }

  const currentIndent = getIndent(depth);
  const bracketIndent = getBracketIndent(depth);
  const lines = Object.entries(currentValue).map(([key, value]) => `${currentIndent}${key}: ${getValue(value, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default (obj) => {
  const iter = (tree, depth) => {
    const currentIndent = getIndent(depth).slice(0, -2);
    const bracketIndent = getBracketIndent(depth);
    const lines = tree.map((item) => {
      const { status } = item;
      switch (status) {
        case 'added':
          return `${currentIndent}+ ${item.key}: ${getValue(item.value, depth + 1)}`;
        case 'deleted':
          return `${currentIndent}- ${item.key}: ${getValue(item.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}- ${item.key}: ${getValue(item.value, depth + 1)}`,
            `${currentIndent}+ ${item.key}: ${getValue(item.value2, depth + 1)}`,
          ].join('\n');
        case 'unchanged':
          return `${currentIndent}  ${item.key}: ${getValue(item.value, depth + 1)}`;
        case 'nested':
          return `${currentIndent}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error();
      }
    });

    return ['{', ...lines, `${bracketIndent}}`].join('\n');
  };

  return iter(obj, 0);
};
