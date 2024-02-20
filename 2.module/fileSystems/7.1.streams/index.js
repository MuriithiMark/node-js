const fs = require('fs')
const path = require('path')
const filePath = path.join(__dirname, "files", "lorem.txt");

// Create Read Stream
const readStream = fs.createReadStream(filePath, { encoding: "utf8" })

// Create Write Stream
const writeStream = fs.createWriteStream(filePath + '.new', { encoding: "utf8" })

// Read the Stream
readStream.on("data", (data) => {
    writeStream.write(data)
})

readStream.on("open", ()=> console.log('Stream opened'))
readStream.on("close", ()=> console.log('Stream closeed'))