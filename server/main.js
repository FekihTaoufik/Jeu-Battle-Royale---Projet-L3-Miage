const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname+'./../client/index.html'));
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})