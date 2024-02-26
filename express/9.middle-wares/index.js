import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

const userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

// simple middleware to log requests with their time, method and url
const mySimpleMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
}

// delay a response by no of seconds
const delayedResponseMiddle = (req, res, next) => {
    setTimeout(() => {
        // delays result for 4 secs
        return next()
    }, 4000)
    // next()
}

const resolveUser = (req, res, next) => {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
        return res.status(400).send({ status: 'fail', message: 'bad request' });
    }

    const filteredUser = userData.find((user) => user.id === userId)

    if (!filteredUser) {
        return res.status(404).send({ status: 'fail', message: 'no such user' })
    }
    req.filteredUser = filteredUser;
    next()
}


app.use(mySimpleMiddleware);

app.get("/api/users", delayedResponseMiddle, (req, res) => {
    const { username } = req.query;
    if (!username) {
        res.send(userData)
        return;
    }
    const filteredUsers = userData.filter((user) => user.username === username)
    res.send(filteredUsers)
})

app.get("/api/users/:userId", resolveUser, (req, res) => {
    const { filteredUser } = req;
    res.status(200).send(filteredUser)
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})

