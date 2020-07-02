const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//     console.log("a client connected to the endpoint /");
//     res.send('Hello World!');
// })

app.get ('/cities', (req, res) => {
    res.send('You are in  the city of barcelona ')
    
})
// app.get('/weather/:cityName', (req, res) => {
//     const name = req.params.cityName;
//     console.log("a client request the weather of " + name);
//     res.send('The weather in ' + name +  ' is 24.5!')
// })
// app.get('/weather', (req, res) => {
//     const name = req.query.name;
//     console.log("a client request the weather of " + name);
//     res.send('The weather in ' + name +  ' is 24.5!')
// })
app.get('/addition', (req, res) => {
    const number1 = req.query.number1;
    const number2 = req.query.number2;
    let result = parseFloat(number1) + parseFloat(number2);
    res.send(`The addition is ${result}`)
})

app.get('/addition/:x1/:x2', (req, res) => {
    const number1 = req.params.x1;
    const number2 = req.params.x2;
    let result = parseFloat(number1) + parseFloat(number2);
    res.send(`The addition is ${result}`)
})

const myCities = [
    {id:1, cityName: "Valencia", country:"Spain", latitude:39.46, longitude:-0.37, weather:28.5 },
    {id:2, cityName: "Paris", country:"Spain", latitude:48.85, longitude:2.27, weather:24.5 },
    {id:3, cityName: "Estambul", country:"Turkey", latitude:41.04, longitude:28.99, weather:34.5 },
    {id:4, cityName: "Tokyo", country:"Japan", latitude:35.50, longitude:138.64, weather:29.5 },
];


app.get('/', (req, res) => {
   const cityNameAndWeather =  myCities.map((any) => {return [any.cityName, any.weather]})
   res.send(cityNameAndWeather)
})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))