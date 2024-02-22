import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

app.get("/", (req, res) => res.send('Hello'))
// listen(port, hostname, () => (runs once when server starts))
app.listen(PORT,() => {
    console.info(`Server running at http://localhost:${PORT}`)
})