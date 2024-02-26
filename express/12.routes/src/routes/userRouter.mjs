import { Router } from "express";

const userRouter = Router()

const userData = [
    { id: 1, username: "mark_m", name: "Mark" },
    { id: 2, username: "danny", name: "Daniel" }
]

// Full URL to get all users ->      /users
userRouter.get("/", (req, res) => {

    // display users data as html
    const htmlData = userData.map((user) => {
        return (
            `
            <li>
                <a href='/users/${user.id}'>${user.name}</a>
            </li>
            `
        )
    }).join("")

    res.send(
        `<ol>${htmlData}</ol>`
    )
    res.end()
})

// Full URL for user with id 10 ->  /users/10
userRouter.get("/:userId", (req, res) => {
    res.send(`Hello, <span style="
        text-decoration: underline; color: red; cursor: pointer;
        ">User ${req.params.userId}</span>`)
    res.end()
})

export default userRouter;