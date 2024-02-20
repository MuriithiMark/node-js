const fs = require("fs");
const path = require("path");

const dbFileName = path.join(__dirname, "db", "data.json");
const products = [
    {
        id: 1,
        category: 'Phones',
        name: 'Xiomi',
        price: 600
    },
    {
        id: 2,
        category: 'Fruit',
        name: 'Orange',
        price: 2
    },
    {
        id: 3,
        category: 'Vehicles',
        name: 'Subaru Forester',
        price: 20000
    }
]

const writeFileCallback = (err) => {
    if (err) {
        throw err;
    }
    console.log('Filw Written!')
}

async function initDB() {
    // Check that dbFile exists
    if (fs.existsSync(dbFileName)) {
        return;
    }

    fs.writeFileSync(dbFileName, JSON.stringify(products), writeFileCallback)
}

const addProductToDB = async (...products) => {

    // fail if there are no products
    if(products.length === 0) {
        console.error('No products to add')
        throw new Error('cannnot add null items');
    }

    /**
     * @type { string }
     */
    let dbFile = null;

    try {
        dbFile = fs.readFileSync(dbFileName, { encoding: "utf8" })
    } catch (err) {
        // Attempt to create new db file
        fs.writeFile(dbFileName, JSON.stringify(dbFile))
    }
    
    if (!dbFile) {
        dbFile = "[]"
    }
    const db = JSON.parse(dbFile)
    let productsToAdd = []

    // Only write product if it doesn'exits -> emulate bulk write with unique id
    for (var product of products) {
        const productFound = db.find((productInDb) => productInDb.id === product.id);
        if(productFound) {
            continue;
        } 
        productsToAdd.push(product)
    }

    // return if there are no products to add
    if(productsToAdd.length === 0) {
        console.log('products with given id already exist')
        console.table(products);
        return;
    }

    db.push(...productsToAdd);
    fs.writeFile(dbFileName, (JSON.stringify(db)), (err) => {
        if (err) {
            throw err;
        }
        console.log('db updated with ')
        console.table(products)
    })
}

initDB().then(() => {
    addProductToDB({
        id: 5,
        category: 'Smart Tv',
        name: 'Hisense Tv',
        price: 200,
    })
})