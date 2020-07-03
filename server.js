const express = require('express')
const app = express()
const port = 3000

//....................class practice......................................................................

// app.get('/', (req, res) => {
//     console.log("a client connected to the endpoint /");
//     res.send('Hello World!');
// })

app.get('/cities', (req, res) => {
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

//......................................HOMEWORK..................................................................

const myCities = [{
        id: 1,
        cityName: "Valencia",
        country: "Spain",
        latitude: 39.46,
        longitude: -0.37,
        weather: 28.5
    },
    {
        id: 2,
        cityName: "Paris",
        country: "Spain",
        latitude: 48.85,
        longitude: 2.27,
        weather: 24.5
    },
    {
        id: 3,
        cityName: "Estambul",
        country: "Turkey",
        latitude: 41.04,
        longitude: 28.99,
        weather: 34.5
    },
    {
        id: 4,
        cityName: "Tokyo",
        country: "Japan",
        latitude: 35.50,
        longitude: 138.64,
        weather: 29.5
    },
];



//task 1
app.get('/', (req, res) => {
    const cityNameAndWeather = myCities.map(any => ({cityName: any.cityName, weather:any.weather}))
    res.send(cityNameAndWeather)
})

//task 2
app.get('/city/:cityName', (req, res) => {
    const cityName = req.params.cityName
    console.log(`a client requested the name of the city : ${cityName}`);
    filteredCity = myCities.filter(any => cityName === any.cityName).map(any =>( {cityName : any.cityName, weather:any.weather }))
    res.send(filteredCity)

    })

//task 3
app.get('/city', (req, res) => {
    let cityName = req.query.name;
    console.log(`a client requested the name of the city ${cityName}`);
    res.send(myCities.filter(any => cityName === any.cityName).map(any =>( {cityName : any.cityName, weather:any.weather })))
})

//task 4
app.get('/city', (req, res) => {
    const reqLatitude = req.query.lat
    const reqLongitude = req.query.lon
    console.log(`a client requested the cityName and weather with endpoint query ${reqLatitude} and ${reqLongitude}`);
    let myResponse = myCities.filter(any => reqLatitude == any.latitude & reqLongitude == any.longitude).map(any =>( {cityName : any.cityName, weather:any.weather }))
    res.send(myResponse)

})

//task 5
app.get('/city', (req, res ) => {
    const id = parseFloat(req.query.id) 
    console.log(`a client requested cityName and weather with the query ${id}`);
    
    res.send(myCities.filter(any => id === any.id).map(any =>( {cityName : any.cityName, weather:any.weather })))
})

//task 6
app.get('/country/:countryName', (req, res) => {
    const countryName = req.params.countryName.toUpperCase()
    console.log(`A client requested the cityName and weather with the endpoint parameters ${countryName}`);
    const myResponse = myCities.filter(any => countryName === any.country.toUpperCase()).map(any =>( {cityName : any.cityName, weather:any.weather }))
    res.send(myResponse)
    
})

//task 7
app.get('/city/search/:text', (req, res) => {
    const city = req.params.text.toUpperCase()
    
    console.log(`A client requested the cityName and weather with the endpoint parameter ${city}`);
    const myResponse = myCities.filter(any => any.cityName.toUpperCase().includes(city)).map(any =>( {cityName : any.cityName, weather:any.weather }))
    res.send(myResponse)
    
})



//what is the function of this code ?
const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
};
app.use(myLogger);





//what is the function of this code ??
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))