const fs = require("fs");

console.log('first program starts here')
fs.readFile("./no-such-file.txt", (err, data) => {
    console.log(`i'm first program`)
    if(err) {
        throw err;
    }
    console.log(data)
})

console.log(`i'm second program`)


process.on('uncaughtException', (err) => {
    console.error(err)
    process.exit(1)
})

// first program starts here
// i'm second program
// i'm first program
// [Error: ENOENT: no such file or directory, open './no-such-file.txt'] {
//   errno: -2,
//   code: 'ENOENT',
//   syscall: 'open',
//   path: './no-such-file.txt'
// }