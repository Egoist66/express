"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const http_statuses_1 = require("./utils/http-statuses");
const { OK, CONFLICT, CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR, METHOD_NOT_ALLOWED, NO_CONTENT, NOT_FOUND, SERVICE_UNAVAILABLE, UNAUTHORIZED, BAD_REQUEST, ACCEPTED } = http_statuses_1.HTTP_STATUSES;
exports.app = (0, express_1.default)();
const PORT = 3000;
const jsonBodyMiddleware = express_1.default.json();
exports.app.use(jsonBodyMiddleware, (0, compression_1.default)());
exports.app.use((0, cors_1.default)());
const data = {
    messages: [],
    statusCode: 0,
    courses: [
        { id: 1, title: 'front-end' },
        { id: 2, title: 'back-end' },
        { id: 3, title: 'automation-qa' },
        { id: 4, title: 'devops' },
        { id: 5, title: 'php' },
    ]
};
const copy = structuredClone(data);
/*GET Routes API*/
exports.app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});
exports.app.get('/courses', (req, res) => {
    let foundCoursesQuery = data.courses;
    if (req.query.title) {
        foundCoursesQuery = foundCoursesQuery.filter(c => c.title.includes(req.query.title));
        if (!foundCoursesQuery.length) {
            res.status(OK).json([]);
        }
        else {
            res.json(foundCoursesQuery);
        }
    }
    res.status(OK).json(data);
});
exports.app.get('/courses/:id', (req, res) => {
    const foundCourse = data.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        data.messages = ['No such course'];
        data.statusCode = 1;
        data.courses = [];
        res.status(NOT_FOUND).json(data);
    }
    res.status(OK).json(foundCourse);
    data.messages = [];
    data.statusCode = 0;
    data.courses = copy.courses;
});
exports.app.get('/users', (req, res) => {
    res.status(OK).json({ users: ['Farid', 'Jack', 'Peter', 'Vova'] });
});
/*POST Routes API*/
exports.app.post('/courses', (req, res) => {
    if (!req.body.title || req.body.title === '') {
        data.messages = ['Title is required field in body'];
        data.courses = [];
        data.statusCode = 1;
        res.status(BAD_REQUEST).send(data);
        return;
    }
    const newItem = {
        id: +new Date(),
        title: req.body.title.trim()
    };
    data.courses = copy.courses;
    data.messages = [];
    data.statusCode = 0;
    data.courses.push(newItem);
    res.status(CREATED).json(data);
});
/*DELETE Routes API*/
exports.app.delete('/courses/:id', (req, res) => {
    const foundItem = data.courses.find(c => c.id === +req.params.id);
    if (!foundItem) {
        data.messages = ['Unable to delete what does not exist'];
        data.statusCode = 1;
        res.status(NOT_FOUND).send(data);
    }
    const restCourses = data.courses.filter(c => c.id !== +req.params.id);
    data.messages = [];
    data.statusCode = 0;
    data.courses = restCourses;
    res.status(OK).send(data);
});
/*PUT Routes API*/
exports.app.put('/courses/:id', (req, res) => {
    const foundCourse = data.courses.find(c => c.id === +req.params.id);
    if (!foundCourse) {
        data.messages = ['No such course to update'];
        data.statusCode = 1;
        data.courses = [];
        res.status(BAD_REQUEST).json(data);
        return;
    }
    if (req.body.title && req.body.title !== '') {
        foundCourse.title = req.body.title.trim();
        res.status(OK).json(foundCourse);
    }
    res.status(BAD_REQUEST).send({ message: 'No title was provided' });
});
exports.app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
