import express from "express"
import addJsonData from "./utils.js";

const app = express()
const port = 3000;
app.use(express.json())

const { getProducts, addProduct, deleteProduct, updateProduct } = await addJsonData()
// GET Products
app.get("/api/products", async (req, res) => {
    const products = await getProducts()
    res.status(200).send(products).end()
})

// POST Product/s
app.post("/api/products", async (req, res) => {
    console.log('req.body ', req.body)
    const productsData = req.body;
    try {
        await addProduct(productsData)
        res.send({
            status: "success",
            message: "product added"
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: "fail",
            message: error.message
        })
    }

    res.end()
})

// DELETE Product
app.delete("/api/products/:id", async (req, res) => {
    const id = req.body.id;
    try {
        await deleteProduct(id)
        res.send({
            status: "success",
            message: "product deleted"
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: "fail",
            message: error.message
        })
    }
})

app.put("/api/products/update", async (req, res) => {
    const updatedProduct = req.body;
    try {
        await updateProduct(updatedProduct)
        res.send({
            status: "success",
            message: "product updated"
        })
    } catch (error) {
        res.send({
            status: "fail",
            message: error.message
        })
    }
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})