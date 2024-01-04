import express from 'express'


const app = express()
const port = 3000

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
    statusCode: 0,
    courses:  [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'automation-qa'},
        {id: 4, title: 'devops'},
        {id: 5, title: 'php'},
    ]

} as Data

app.get('/courses', (req, res) => {
    let foundCoursesQuery = data.courses
    if(req.query.title){
        foundCoursesQuery = foundCoursesQuery.filter(c => c.title.includes(req.query.title as string))
        res.json(foundCoursesQuery)

        return

    }


    res.status(200).json(data)
})



app.get('/courses/:id', (req, res) => {
    const dataCopy = structuredClone(data)

    const foundCourse = data.courses.find(c => c.id === +req.params.id)
    if(!foundCourse){
        dataCopy.messages = ['No such course']
        dataCopy.statusCode = 1
        dataCopy.courses = []

        res.status(404).json(dataCopy)

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