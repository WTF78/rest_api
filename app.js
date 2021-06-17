require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express();
const ejs = require('ejs')

//MiddleWare
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

//Import routes
const postsRoute = require('./routes/posts')

app.use('/posts', postsRoute)

//ROUTES
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

//Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false},  () =>
    console.log('Connected to DB'))

//Listening to the server
app.listen(3000);