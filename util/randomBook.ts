let typescript = require("typescript");
let JsonSourceFile = typescript.JsonSourceFile;
const jsonData: InstanceType<typeof JsonSourceFile> = require("./librarySource.json");

function getRandomBook(): Object {
    const values: any = Object.values(jsonData)
    const randomValue: Object = values[Math.round(Math.random() * values.length)]
    return randomValue;
}

module.exports = { getRandomBook };