const express = require('express')
const app = express()

const port = process.env.API_PORT || 8080

app.get("/hello", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Serveur listening on ${port}`);
})