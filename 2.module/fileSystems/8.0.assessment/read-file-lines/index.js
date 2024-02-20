const fs = require("fs")
const path = require("path")

const fileName = path.join(__dirname, "data.txt")
const readStream = fs.createReadStream(fileName, { encoding: "utf8" })

readStream.on("data", (data) => {
    // Keep track of line number
    let num = 0;
    // Doesn't read line by line
    // split by newline delimiter
    const lines = data.split('\n')
    for (var line of lines) {
        console.log(`Line `, ++num, ` `, line)
    }
})

// USING readline
const readline = require('readline');

console.log('USING readline')
let num = 0;

const file = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
});


file.on('line', (line) => {
    console.log('Line ', ++num, ': ', line);
});