import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

const userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

app.get("/api/users", (req, res) => {
    console.log(req.query)
   const { username } = req.query;
    if (!username) {
        res.send(userData)
        return;
    }
    const filteredUsers= userData.filter((user) => user.username === username)
    res.send(filteredUsers)
})

app.get("/api/users/:userId", (req, res) => {
    const userId = Number(req.params.userId);
    if(isNaN(userId)) {
        return res.status(400).send({ status: 'fail', message: 'bad request'});
    }

    const filteredUser = userData.find((user) => user.id === userId)

    if (!filteredUser) {
        return res.status(404).send({status: 'fail', message: 'no such user'})
    }
    res.status(200).send(filteredUser)
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})

