import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

app.use(express.json())

const userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

app.get("/api/users", (req, res) => {
    return res.status(200).send(userData)
})

app.put('/api/users/update', (req, res) => {
    const data = req.body;
    const userIndex = userData.findIndex((user) => user.id === data.id);
    userData[userIndex] = data
    return res.status(201).send({ status: 'success', message: 'user updated' })
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})