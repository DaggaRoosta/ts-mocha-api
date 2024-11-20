let typescript = require("typescript");
let JsonSourceFile = typescript.JsonSourceFile;
const jsonData: InstanceType<typeof JsonSourceFile> = require("./librarySource.json");
const values: InstanceType<typeof Object> = Object.values(jsonData)

function getRandomBook(data: Object = values): Object {
    const randomValue: Object = data[Math.round(Math.random() * Object.keys(data).length)]
    return randomValue;
}
module.exports = { getRandomBook };
