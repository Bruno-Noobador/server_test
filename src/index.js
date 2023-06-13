const express = require("express")
const fs = require("fs")
const { getDatabaseInstance } = require("./database")

const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", async (req, res) => {
  const { title, source, description, thumb } = req.query
  const db = await getDatabaseInstance()
  const result = await db.run(`
    INSERT INTO movies(title, source, description, thumb) VALUES(?, ?, ?, ?)`,
    [title, source, description, thumb]
  )
  res.send(result)
})

app.use("/read", (req, res) => {
  const { file } = req.query
  // fs.readFileSync
})

app.use("/update", (req, res) => {
  const { file, text } = req.query
  // fs.appendFileSync
})

app.use("/delete", (req, res) => {
  const { file } = req.query
  // fs.rmSync
})

app.listen(3000, () => console.log("Servidor rodando!"))