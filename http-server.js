const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.static(__dirname + '/public'))

app.use("/create", (req, res) => {
  const { file, text } = req.query
  console.log(`file: ${file}`)
  console.log(`text: ${text}`)
  try {
    if (file === undefined) {
      res.send(`file not defined <br> expecify file to be created`)
    }
    if (text === undefined) {
      res.send(`text for file not defined`)
      return
    }
    if (fs.existsSync) {
      res.send(`file '${file}' already exists`)
      return
    }
    fs.writeFileSync(file, text)
    res.send(`file '${file}' created with content '${text}'`)
  }
  catch (error) {
    res.error(error)
  }
})

app.use("/read", (req, res) => {
  const { file } = req.query
  if (!fs.existsSync(file)) {
    res.send(`file '${file}' doesnt exist`)
    return
  }
  const fileContent = fs.readFileSync(file,  'utf8')
  res.send(`${fileContent}`)
})

app.use("/update", (req, res) => {
  const { file, text } = req.query
  
  if (file === undefined) {
    res.send(`file not defined <br> expecify file to be created`)
    return
  }
  if (text === undefined) {
    res.send(`text for file not defined`)
    return
  }

  if (!fs.existsSync(file)) {
    res.send(`file '${file}' doesnt exist`)
    return
  }
  console.log(`text: ${text}`)
  fs.appendFileSync(file, "\n" + text)
  res.send(`added '${text}' to file '${file}' `)
})

app.use("/delete", (req, res) => {
  const { file } = req.query
  if (file === undefined) {
    res.send(`file not defined <br> expecify file to be created`)
    return
  }
  if (!fs.existsSync(file)) {
    res.send(`file '${file}' doesnt exist`)
    return
  }
  fs.rmSync(file)
  res.send(`file '${file}' deleted`)
})

app.listen(3000, () => console.log("Servidor rodando!"))