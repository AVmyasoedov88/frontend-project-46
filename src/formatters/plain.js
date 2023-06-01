function getType (data) {
    if (typeof data === 'string') {
        //console.log(data)
        return `'${data}'`
    }
   else if ( data === null || typeof data === "boolean") {
        //console.log(data)
        return `${data}`
    }
    else if ( typeof data === "number") {
        //console.log(data)
        return data
    }
 
    else if (typeof data === 'object') {
        return `[complex value]`
    }
}


export default (obj) => {
const  testPlain = (obj, path) => {
 const treeWithOutChange = obj.filter((node) => node.status !== 'unchanged')
 return treeWithOutChange.map((node) => {
    const pathTree = (path === '') ? `${node.key}` : `${path}.${node.key}`
    //console.log(node.value)
       switch(node.status) {
        case 'added':
            return `Property '${pathTree}' was added with value: ${getType(node.value)}`;
        case 'changed':
            //console.log(node.value2)
            return `Property '${pathTree}' was updated. From ${getType(node.value)} to ${getType(node.value2)}`;
        case 'deleted':
            return `Property '${pathTree}' was removed`;
        case 'nested':
            return testPlain(node.children, pathTree);
        default:
            throw new Error()
    }
 }).join('\n')

}
return `{\n${testPlain(obj, '')}\n}`
}

