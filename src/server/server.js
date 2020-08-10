
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
// const dotenv = require('dotenv');
// dotenv.config();

const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))
// Cors for cross origin allowance
app.use(cors());
// Setup Server
const port = 8080;
app.listen(port,listening);

function listening (){
    console.log(`server is running on port: ${port}`);
}
// app.get('/', function (req, res) {
//     // res.sendFile('dist/index.html')
//     res.sendFile(path.resolve('dist/index.html'))
// })
//GET
app.get('/all', sendData);

function sendData(req , res){
res.send(projectData);
}
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
//POST
app.post('/add',postData);

function postData(req,res){
    let data = req.body;
    console.log('server side data ', data);
    projectData['country'] = data.country;
    projectData['city'] = data.city;
    projectData['status'] = data.status;
    projectData['temperature'] = data.temperature;
    projectData['image'] = data.image;
    res.send(projectData);
}
module.exports = {app};