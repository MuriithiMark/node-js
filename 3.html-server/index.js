const fs = require("fs")
const path = require("path")
const http = require("http")

const HOME_PAGE_FILE_NAME = path.join(__dirname, "templates", "home.html")
const ABOUT_PAGE_FILE_NAME = path.join(__dirname, "templates", "about.html")
const PORT = 8001;

const server = http.createServer((req, res) => {

    res.setHeader('Content-Type', "application/html")
    switch (req.url) {
        case "/":
            res.writeHead(200, 'OK')
            res.write('Home Page');
            break;
        case "/about":
            res.writeHead(200, 'OK')
            res.write('About Page')
            break;
        default:
            res.writeHead(404, 'Page Not Found')
            res.write('Page Not Found')
    }
    res.end()
})


server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
