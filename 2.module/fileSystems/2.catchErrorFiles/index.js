const fs = require("fs");

fs.readFile("./no-such-file.txt", (err, data) => {
    if(err) {
        throw err;
    }
    console.log(data)
})


process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
})