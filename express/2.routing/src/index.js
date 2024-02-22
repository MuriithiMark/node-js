import express from "express";

const app = express()
const PORT = process.env.PORT ?? 3000;

// HTTP Methods
// GET    - retrive data from server, serve data from server
// POST   - send data to the server from client
// PUT    - send data to server to perform updates of entire resource based on its unique identifier -> mainly the id
//        - all fields of resource to be updated must be present, if a particular field is missing it will be null
// PATCH  - send partial data updates for resource based on unique identifier of the resource
// DELETE - deletes the record completely
//

const homeHTML = (obj) => {
    return (
        `
        <h1>${obj.title}</h1>
        <p>Hello ${obj.person.name}</p>
        `
    )
}
app.get("/", (req, res) => {
    res.send(homeHTML({
        title: 'Portofolio', person: {
            name: 'Mark Mwangi'
        }
    }))
})

app.listen(PORT, () => {
    console.info(`Server running at http://localhost:${PORT}`)
})