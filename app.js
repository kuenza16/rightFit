const express = require("express")

const path = require('path')
const app = express()
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes')
const hrRoutes = require('./routes/hrRoutes')
const jobRoutes = require('./routes/jobRoutes')
const applyRoutes = require('./routes/applyRoutes')
const resultRoutes = require('./routes/resultRoutes');

const viewRoutes = require('./routes/viewRoutes')



app.use(express.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));


app.use('/api/v1/users', userRouter)

app.use('/api/v1/hrs', hrRoutes)
app.use('/api/v1/jobs', jobRoutes)
app.use('/api/v1/apply', applyRoutes)
app.use('/api/v1/results', resultRoutes);





app.use('/', viewRoutes)
app.use(express.static(path.join(__dirname, 'views')))



module.exports = app