const fsPromises = require("fs").promises;
const path = require("path");

const fileOperations = async () => {
    const fileName =path.join(__dirname, "files", "starter.txt")
    try {
        const data = fsPromises.writeFile(fileName, "initial data");
        await fsPromises.appendFile(fileName, "\nsome more data");
        await fsPromises.rename(fileName, path.join(__dirname, "files", "new-file.txt"))
    } catch (error) {
        console.error(error);
    }
}

fileOperations()