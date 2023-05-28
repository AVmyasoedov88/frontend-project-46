import _ from "lodash";
import findDifferences from "/home/anton/frontend-project-46/src/findDifferences.js";

//const test = findDifferences('file1.json', 'file2.json')
//console.log(test)

const  getSpace = (spacesCount) => ('..'.repeat(spacesCount))


function stringify(value, spacesCount = 0) {
  //console.log(replacer)
  if (!_.isObject(value)) {
    //console.log( value)
    return value
  }
  const lines = Object.keys(value).map((item) => `${getSpace(spacesCount + 2)}${item}: ${stringify(value[item], spacesCount + 2)}`)
  const newLines = lines.join('\n')
  const result = `{\n${newLines}\n${getSpace(spacesCount + 1)}}`
  return result
}


export default (innerTree) => {
   // innerTree = findDifferences;
    //console.log(innerTree)
    const iter = (tree, spacesCount = 1) => {
      const lines = tree.map((node) => {
        switch (node.status) {
          case 'deleted':
            //console.log(node.value)
            return `${getSpace(spacesCount)}- ${node.key}: ${stringify(node.value, spacesCount)}`;
          case 'added':
            return `${getSpace(spacesCount)}+ ${node.key}: ${stringify(node.value, spacesCount)}`;
          case 'unchanged':
            return `${getSpace(spacesCount)}  ${node.key}: ${stringify(node.value, spacesCount)}`;
          case 'changed':
            return `${getSpace(spacesCount)}- ${node.key}: ${stringify(node.value, spacesCount)}\n${getSpace(spacesCount)}+ ${node.key}: ${stringify(node.value2, spacesCount)}`;
          case 'nested':
            return `${getSpace(spacesCount)}  ${node.key}: ${iter(node.children, spacesCount+2)}`;
          //default:
            //throw new Error();
        }
        
      })
      //console.log(lines)
      const innerTree = lines.join('\n')
      
      return `{\n${innerTree}\n${getSpace(spacesCount-1)}}`
    }
    return iter(innerTree)
  }

//console.log(f(test))