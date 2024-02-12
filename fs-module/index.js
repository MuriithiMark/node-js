import fs from 'fs';

// Asynchronously Reading a file
fs.readFile('./blog.txt', (err, data) => {
    if (err) throw err;

    console.log(`Async: ${data.toString()}`)
});


// Synchronous Read a file
// wrap in try catch block to handle errors
try {
    const data = fs.readFileSync('./blog.txt');
    console.log(`Sync: ${data.toString()}`)
} catch (error) {
    console.log(error)
}

// Asyncronously writing a file
fs.writeFile('./blog-2.txt', 'Async Data is writing!', (err) => {
    if (err) console.log(err)
})

// Synchronously write a file
fs.writeFileSync('./blog-3.md', '# Blog 3')


// Delete a file
// first check that the file exists
if (fs.existsSync('./blog-2.txt')) {
    fs.unlink('./blog-2.txt', (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File deleted');
    })
} else {
    console.log(`File doesn't exist.`);
}

// Create a folder
// confirm that the folder is non existent
if (!fs.existsSync('assets')) {
    fs.mkdir('assets', (err) => {
        if (err) {
            console.error(err);
            return;
        };
        fs.writeFile('./assets/blog-1.txt', 'Blog 1 test data', (err) => {
            if(err) {
                console.error(err);
                return;
            }
            console.log('Created "blog-1.txt" file.')
        })
        console.log(`Folder 'assets' created!`)
    })
}
else console.log('Folder already exists')

// Remove a folder
if(fs.existsSync('./my-folder')) {
    fs.rmdir('./my-folder', (err) => {
        if(err) {
            console.error(err);
            return;
        }
        console.log(`Folder 'my-folder' deleted`)
    })
}
else {
    console.log(`Folder 'my-folder' doesn't exist`)
}

// Move files to a given directory