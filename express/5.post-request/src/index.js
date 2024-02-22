import express from "express";

const app = express()
// app.use(bodyParser.json())
app.use(express.json())
const PORT = process.env.PORT ?? 3000;

const userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

app.get("/api/users", (req, res) => {
    return res.status(200).send(userData)
})

app.post('/api/users/new', (req, res) => {
    const data = req.body;
    const newUser = {id: userData[userData.length - 1].id + 1, ...data};
    userData.push(newUser)
    return res.status(201).send({ status: 'success', message: 'user created', newUser })
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})