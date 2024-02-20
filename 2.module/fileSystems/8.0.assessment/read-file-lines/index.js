const fs = require("fs")
const path = require("path")

const fileName = path.join(__dirname, "data.txt")
const readStream = fs.createReadStream(fileName, { encoding: "utf8"})

let num = 0;
readStream.on("data", (data) => {
    const lines = data.split('\n')
    for(var line of lines) {
        console.log(`Line ${++num}: ${line}`)
    }
})