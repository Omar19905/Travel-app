
const dotenv = require('dotenv').config();
let path = require('path')
const express = require('express')
const axios = require('axios');
const app = express()

// Cors for cross origin allowance
let cors = require("cors");

const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json());



app.use(express.static('dist'))
app.use(cors());
console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})

app.post("/weather",(req ,res)=>{
    console.log("hi")
    axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${req.body.text}&days=3&key=${process.env.weatherbit_key}`)
        .then(response => {
            res.send(response.data)
        })
})

app.post("/picture",(req ,res)=>{
    console.log(req.body.text)
    axios.get(`https://pixabay.com/api/?key=${process.env.pixabay_key}&q=${req.body.text}&image_type=photo`)
        .then(response => {
            res.send(response.data)
        })
})



app.post("/url",(req ,res)=>{
    axios.get(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=en&url=${req.body.url}`)
        .then(response => {
            res.send(response.data)
        })

})




app.get('/test',  function (req, res) {
    res.send({message: 'Pass!'})
})

let port = 8081 || process.env.PORT;
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () =>{
        console.log(`listening at http://localhost:${port}`)
    });
}


module.exports = app
