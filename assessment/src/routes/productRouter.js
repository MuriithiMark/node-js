import { Router } from "express";
import { checkSchema, validationResult, matchedData } from "express-validator";

import { dbMethods } from "../utils/db.js";
import { addProductSchema } from "../utils/validations-schema.js";

const productRouter = Router()

const { getProducts, addProduct, deleteProduct, updateProduct, editProduct } = await dbMethods()

// GET Products
productRouter.get("/api/products", async (req, res) => {
    const products = await getProducts()
    res.status(200).send(products).end()
})

// POST Product
productRouter.post("/api/products", checkSchema(addProductSchema), async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        // execute code kama kuna errors
        return res.send(errors).end()
    }

    const productsData = matchedData(req)

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

// UPDATE Product
productRouter.put("/api/products/update", async (req, res) => {
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

// EDIT Product
productRouter.patch("/api/products/edit", async (req, res) => {
    const editedProduct = req.body;
    try {
        await editProduct(editedProduct)
        res.send({
            status: "success",
            message: "product edited"
        })
    } catch (error) {
        res.send({
            status: "fail",
            message: error.message
        })
    }
})

// DELETE Product
productRouter.delete("/api/products/:id", async (req, res) => {
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


export default productRouter;