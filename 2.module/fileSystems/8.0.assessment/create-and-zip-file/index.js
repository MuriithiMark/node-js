const fsPromises = require("fs").promises;
const path = require("path")
const zipper = require("zip-local");

// const JSzip = require("jszip")
// const zip = new JSzip();

const fileName = path.join(__dirname, "files", "output-file.txt");
const zipFileName = path.join(__dirname, "files", "output-zip-file.zip")

// const createAndZipFile = async () => {
//     try {
//         await fsPromises.writeFile(fileName, `Hello there. I'm output file.`)
//         zip.file(fileName)
//         zip.generateAsync({ type: 'uint8array' })
//             .then((content) => {
//                 console.log(content)
//                 fsPromises.writeFile(zipFileName, content)
//             })
//     } catch (error) {
//         console.log(error)
//     }
// }

// createAndZipFile()


const createAndZipFile_2 = async () => {
    try {
        await fsPromises.writeFile(fileName, `Hello there. I'm output file.`)
        zipper.sync.zip(fileName).compress().save(zipFileName)
    } catch (error) {
        console.error(error);
    }
}

createAndZipFile_2()