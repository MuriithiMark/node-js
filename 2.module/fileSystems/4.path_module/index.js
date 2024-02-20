const fs = require("fs");
const path = require("path");

fs.readFile("./starter.txt", (err, data) => {
    if (err) {
        throw err;
    }
    console.log(String(data), '\n')
})

const goXDirectoriesAbove = (currentFile, noOfDirectories = 1) => {
    return __filename.split('/').reverse().splice(noOfDirectories).reverse().join('/')
}

console.log(goXDirectoriesAbove(__filename, 2))

fs.readFile(path.join(__dirname, 'files', 'lorem.txt'), (err, data) => {
    if (err) {
        throw err;
    }
    console.log(String(data), '\n')
})

process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
})
