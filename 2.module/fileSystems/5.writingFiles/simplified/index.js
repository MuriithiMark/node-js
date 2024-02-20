const fs = require("fs");

// Write data to a file
fs.writeFile('./new-file.txt', 'Hello there', (err) => {
    // check if there is an error
    if(err) {
        console.error(err)
        // early return if there is an error
        return;
    }
    console.log('finished writing file')
})