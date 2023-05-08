import { cwd } from 'node:process';
import fs from 'fs';
import { log } from 'node:console';
import _ from "lodash";
import path from 'path';
import ConfigFactory from './parsers.js';


function getInf(obj1, obj2) {
    const keys = _.uniq([...(Object.keys(obj1)), ...(Object.keys(obj2))])
    const sortedKeys = _.sortBy(keys)

    const result = sortedKeys.map((key) => {
        let arr = []
        if ((obj1[key] && obj2[key]) && (obj1[key] !== obj2[key])) {
            const a = `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`
            arr.push(a)

        }

        if (!_.has(obj2, key)) {
            arr.push(`- ${key}: ${obj1[key]}`)

        }

        if (!_.has(obj1, key)) {
            arr.push(`+ ${key}: ${obj2[key]}`)

        }

        if (obj1[key] === obj2[key]) {
            arr.push(`  ${key}: ${obj1[key]}`)
        }

        return arr
    })

    return `{\n${result.join('\n')}\n}`
}


function genDiff(filePath1, filePath2) {
    const object1 = ConfigFactory.factory(filePath1) //в отдельный модуль
    const object2 = ConfigFactory.factory(filePath2)
    return getInf(object1, object2)
};
//genDiff('file1.yml', 'file2.json')

export default genDiff;

//console.log(temp) https://github.com/TopchiyVictor/frontend-project-lvl2/blob/main/src/index.js