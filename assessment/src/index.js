import express from "express"
import addJsonData from "./utils.js";

const app = express()
const port = 3000;
app.use(express.json())

const { getProducts, addProduct } = await addJsonData()
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
            message: "adding product failed"
        })
    }

    res.end()
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})