import express from 'express'
import dotenv from 'dotenv'
const app = express()

dotenv.config({path: 'backend/config/config.env'})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})