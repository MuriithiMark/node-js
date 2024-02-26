import express from "express"
import { initDB } from "./utils/db.js";
import productRouter from "./routes/productRouter.js";

const app = express()
const port = 3000;

app.use(express.json())


app.use(productRouter)

// Initialize database then run server
initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
})