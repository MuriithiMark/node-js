import express from "express";
import fs from 'fs';
import bodyParser from "body-parser";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/health', async (req, res) => {
    res.status(200).send('Server is running ...');
});

app.get('/download/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    if (!fileName) {
        // should show invalid url
        res.status(404).json({
            status: false,
            message: `Invalid url; no file name provided`
        });
        return;
    }

    const filePath = `./assets/${fileName}`;
    if (!fs.existsSync(filePath)) {
        res.status(404).json({
            status: false,
            message: `${fileName} doesn't exist`
        });
    }

    res.status(200).download(filePath);

})

app.get('/go-next', (req, res, next) => {
    console.log('My First Function!');
    res.test_text = 'Hello there!';
    next();
}, (req, res) => {
    console.log(`[RES modified]: ${res.test_text}`);
    console.log(`I'm next function`);
    res.status(200).send(`I'm next function!`);
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${8000}/`);
})

