import express from "express"

const port = 3000;
const app = express()

app.get("/hello", (req, res) => {
    console.log('Hello')
    const person = req.query.person
    res.status(200).send(`Hello, ${person}`)
    res.end()
})


const curryMaster = () => {
    let counter = 0;

    counter++;
    console.log('Curry counter: ', counter)

    const now = () => {
        counter++;
        console.log('Curry counter: ', counter)
        return {
            curry
        }
    }

    const curry = () => {
        counter++;
        console.log('Curry counter: ', counter)
        return {
            now
        }
    }

    return {
        now,
        curry
    }
}
curryMaster()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()
    ["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]()["now"]()["curry"]();


import { query, validationResult, matchedData } from "express-validator";
app.get("/helloValidated",
    [
        query("person")
            .notEmpty().withMessage("params cannot be empty")
            .isString().withMessage("params must be a string")
            .escape()
    ],
    (req, res) => {
        // used to extract validation errors, empty if there are no errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.send(errors).end()
        }

        // used to extract data that has been validated
        const data = matchedData(req)
        res.status(200).send(`Hello, ${data.person}`).end()
    }
)

app.listen(port, () => console.log(`Server running at http://localhost:${3000}`))