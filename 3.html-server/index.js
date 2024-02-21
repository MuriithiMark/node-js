const fsPromises = require("fs").promises
const path = require("path")
const http = require("http")

const HOME_PAGE_FILE_NAME = path.join(__dirname, "templates", "index.html")
const SIGN_UP_PAGE_FILE_NAME = path.join(__dirname, "templates", "sign-up.html")
const ERROR_PAGE_FILE_NAME = path.join(__dirname, "templates", "404.html")
const STYLES = path.join(__dirname, "templates", "styles.css")
const PORT = 8001;

const getFileContent = async (fileName) => {
    const fileContent = await fsPromises.readFile(fileName, { encoding: "utf8" });
    return fileContent;
}

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case "/":
            res.write(await getFileContent(HOME_PAGE_FILE_NAME))
            break;
        case "/sign-up":
            res.write(await getFileContent(SIGN_UP_PAGE_FILE_NAME))
            break;
        case "/styles.css":
            res.write(await getFileContent(STYLES))
            break;
        default:
            res.write(await getFileContent(ERROR_PAGE_FILE_NAME))
    }
    res.end()
})


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
