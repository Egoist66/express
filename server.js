import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
     res.send('Hello World!')
})

app.get('/users', (req, res) => {
     res.sendStatus = 200
     res.setHeader('Content-Type', 'application/json')
     res.json({ users: ['Farid', 'Jack', 'Peter', 'Vova'] })
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
})