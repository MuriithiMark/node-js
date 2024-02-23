import fs from "node:fs"
import fsPromises from "node:fs/promises";
import path from "path";
import * as Uuid from "uuid";

const DB_FOLDER = path.join("src", "data")
const PRODUCTS_FILE = path.join(DB_FOLDER, "productsData.json")

async function addJsonData() {
    try {
        if (!fs.existsSync(DB_FOLDER)) {
            await fsPromises.mkdir(DB_FOLDER)
        }

        if (!fs.existsSync(PRODUCTS_FILE)) {
            // Initialize file with empty array
            await fsPromises.writeFile(PRODUCTS_FILE, "[]")
        }
    } catch (error) {
        // if there are errors immediately throw
        console.error(error)
        throw error;
    }

    // Read the Products file
    /**
     * @type {{}[]}
     */
    const getProducts = async () => {
        const products = JSON.parse(await fsPromises.readFile(PRODUCTS_FILE, { encoding: "utf8" }))
        return products
    }

    
    const addProduct = async (...product) => {
        const products = await getProducts()
        if (!product) {
            console.error('Invalid Product ', product)
            throw new Error('Invalid Product');
        }
        product.id = Uuid.v4()
        products.push(...product)
        await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products))
    }

    const updateProduct = async (updatedProduct) => {
        const products = await getProducts()
        if (!updatedProduct) {
            console.error('Updated Product is invalid ', updatedProduct)
            throw new Error('Invalid Product')
        }
        const productIndex = products.find((product) => product.id === updatedProduct.id)
        if (productIndex === -1) {
            console.error('No such product in database');
            throw new Error('No such product with id: ', updatedProduct.id)
        }
        products[productIndex] = updatedProduct;
        // Write updates to file
        await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products))
    }

    const editProduct = async (editedProduct) => {
        const products = await getProducts()
        if (!editedProduct) {
            console.error('edited Product is invalid ', editedProduct)
            throw new Error('Invalid Product')
        }
        const productIndex = products.findIndex((product) => product.id === editedProduct.id)
        if (productIndex === -1) {
            console.error('No such product in database');
            throw new Error('No such product with id: ', editedProduct.id)
        }
        const originalProduct = products[productIndex]
        products[productIndex] = { ...(originalProduct), ...editedProduct };
        await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(products))
    }

    const deleteProduct = async (productId) => {
        const products = await getProducts()
        if (!productId) {
            console.error('Invalid product id')
            throw new Error('invalid id ', productId)
        }
        const updatedProducts = products.filter((product) => product.id !== productId)
        await fsPromises.writeFile(PRODUCTS_FILE, JSON.stringify(updatedProducts))
    }

    return {
        getProducts,
        addProduct,
        updateProduct,
        editProduct,
        deleteProduct
    }
}

export default addJsonData