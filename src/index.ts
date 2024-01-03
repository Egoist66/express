import express from 'express'


const app = express()
const port = 3000

app.use(function (request, response, next) {
    //logger(request, response);
    next();
});


app.get('/', (req, res) => {

    res.send('<h1>Hello World!</h1>')

})

type Data = {
    messages: string[],
    statusCode: number
    courses: Array<{id: number, title: string}>
}

let data = {
    messages: [],
    statusCode: 1,
    courses:  [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation-qa'},
        {id: 4, title: 'devops'},
    ]

} as Data

app.get('/courses', (req, res) => {

    res.status(200).json(data)


})
app.get('/courses/:id', (req, res) => {

    const foundCourse = data.courses.find(c => c.id === +req.params.id)
    if(!foundCourse){
        data.messages = ['No such course']
        data.statusCode = 1
        data.courses = []

        res.status(404).json(data)
        return;
    }

    res.status(200).json(foundCourse)


})

app.get('/users', (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({users: ['Farid', 'Jack', 'Peter', 'Vova']})

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})