const express = require("express");
const tasks = require('./routes/tasks.js')
const app = express();
const connectDB = require("./db/connect");
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware

app.use(express.static('./public'))
app.use(express.json());
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)


// app. get('/api/v1/tasks')          - get all the tasks
// app. post('/api/v1/tasks')         - create a new tasks
// app. get('/api/v1/tasks/:id')      - get single tasks
// app. patch('/api/v1/tasks/:id')    - update tasks  
// app. delete('/api/v1/tasks/:id')   - delete tasks
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, console.log(`Server running at http://localhost:${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start()