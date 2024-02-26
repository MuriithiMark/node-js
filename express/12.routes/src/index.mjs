import express from "express"
import userRouter from "./routes/userRouter.mjs";

const app =express()
const port = 3000;

// All paths in userRouter will be under the /users route
app.use("/users", userRouter)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
