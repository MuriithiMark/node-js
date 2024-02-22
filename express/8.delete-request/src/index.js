import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

app.use(express.json())

let userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

app.get("/api/users", (req, res) => {
    return res.status(200).send(userData)
})

app.delete('/api/users/delete', (req, res) => {
    const data = req.body;
    userData = userData.filter((user) => user.id !== data.id);
    return res.send({ status: 'success', message: 'user deleted', users: userData })
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})