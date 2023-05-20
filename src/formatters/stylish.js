import _ from "lodash";


function indent(strFile) {
    const file = strFile.split('\n')
    return file.map((item) => {
        if (item !== file[0]) {
            return `    ${item}`
        }
        return item
    }).join('\n')

}


function indentWithoutquotes(obj) {
    const strObj = JSON.stringify(obj, null, 4)
    const unquotes = strObj.replaceAll('"', '')
    const result = indent(unquotes);
    return result.replaceAll(',', '').trim();
    //console.log(result)
}


export default (innerTree) => {
    //innerTree = findDifferences(obj1, obj2);
   // console.log(innerTree)
    const iter = (innerTree) => innerTree.map((node) => {
      switch (node.status) {
        case 'deleted':
          return `  - ${node.key}: ${indentWithoutquotes(node.value)}`;
        case 'added':
          return `  + ${node.key}: ${indentWithoutquotes(node.value)}`;
        case 'unchanged':
          return `    ${node.key}: ${indentWithoutquotes(node.value)}`;
        case 'changed':
          return `  - ${node.key}: ${indentWithoutquotes(node.value)}\n  + ${node.key}: ${indentWithoutquotes(node.value2)}`;
        case 'nested':
          return `    ${node.key}: {\n    ${indent(iter(node.children))}\n    }`;
        default:
          throw new Error();
      }
    }).join('\n');
    return `{\n${iter(innerTree)}\n}`;
  };

