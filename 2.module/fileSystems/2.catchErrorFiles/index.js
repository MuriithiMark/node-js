const fs = require("fs");

fs.readFile("./no-such-file.txt", (err, data) => {
    if(err) {
        console.error(err)
        return;
    }
    console.log(data)
})