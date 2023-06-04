function getType(data) {
  if (typeof data === 'string') {
    return `'${data}'`;
  } else if (data === null || typeof data === 'boolean') {
    return `${data}`;
  } else if (typeof data === 'number') {
    return data;
  } else {
    return '[complex value]';
  }
}

export default (obj) => {
  const testPlain = (tree, path) => {
    const treeWithOutChange = tree.filter((node) => node.status !== 'unchanged');
    return treeWithOutChange.map((node) => {
      const pathTree = (path === '') ? `${node.key}` : `${path}.${node.key}`;
      switch (node.status) {
        case 'added':
          return `Property '${pathTree}' was added with value: ${getType(node.value)}`;
        case 'changed':
          return `Property '${pathTree}' was updated. From ${getType(node.value)} to ${getType(node.value2)}`;
        case 'deleted':
          return `Property '${pathTree}' was removed`;
        case 'nested':
          return testPlain(node.children, pathTree);
        default:
          throw new Error();
      }
    }).join('\n');
  };
  return `${testPlain(obj, '')}`;
};
