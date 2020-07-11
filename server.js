const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

var formidable = require('express-formidable');
app.use(formidable());

//....................class practice(for get request)......................................................................




app.get('/cities', (req, res) => {
    res.send('You are in  the city of barcelona ')

})

app.get('/weather/:cityName', (req, res) => {
    const name = req.params.cityName;
    console.log("a client request the weather of " + name);
    res.send('The weather in ' + name +  ' is 24.5!')
})


app.get('/weather', (req, res) => {
    const name = req.query.name;
    console.log("a client request the weather of " + name);
    res.send('The weather in ' + name +  ' is 24.5!')
})
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
const myLogger = (req, res, next) => {
    const visitTime = new Date();
    console.log(`visited ${req.url} at ${visitTime.toLocaleString()}`);
    next();
};
app.use(myLogger);

const nameAndWeatherFunction = (myCities) =>{
return ({ 
    weather: myCities.weather,
    CityName : myCities.cityName,
    })
}



//task 1
app.get('/', (req, res) => {
    const cityNameAndWeather = myCities.map(nameAndWeatherFunction)
    res.send(cityNameAndWeather)
})
//task 2
const searchByName = (mycities, name) => {
        return mycities.filter((any) => name === any.cityName).map((any) => ({cityname: any.cityName, weather: any.weather}))
}

app.get('/city/:cityName', (req, res) => {
    const name = req.params.cityName
    console.log(`a client requested the name of the city : ${name}`);
    res.send(searchByName(myCities, name))

    })

//task 3
const searchByLatLon = (mycities, lat, lon) => {
    return mycities.filter((any) => lat == any.latitude & lon == any.longitude ).map((any) => ({cityname: any.cityName, weather: any.weather}))
}

app.get('/city', (req, res) => {
    let name = req.query.name;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let id = (req.query.id);
    let result = []
    if (name){
        result = searchByName(myCities,name)

    }
    else if ( lat && lon){
        result = searchByLatLon(myCities, lat, lon)

    }
    else if(id){
        result = searchByID(myCities,id)
    }
    res.send(result)
})

//task 5
const searchByID = (mycities, id) => {
    return mycities.filter(any => id == any.id).map(any => ({cityName: any.cityName, weather: any.weather}))
    
}

//task 6
const searchByCountries = (mycities, countryName) => {
    return mycities.filter(any => countryName.toUpperCase() == any.country.toUpperCase()).map(any => ({cityName: any.cityName, weather: any.weather}))


}
app.get('/country/:countryName', (req, res) => {
    const countryName = req.params.countryName.toUpperCase()    
    console.log(`A client requested the cityName and weather with the endpoint parameters ${countryName}`);
    let result = []
    result = searchByCountries(myCities, countryName)
 
    res.send(result)
    
})

const searchByText = (mycities, city) => {
    return  mycities.filter(any => any.cityName.toUpperCase().includes(city)).map(any =>( {cityName : any.cityName, weather:any.weather }))


}


//task 7
app.get('/city/search/:text', (req, res) => {
    const city = req.params.text.toUpperCase()
     console.log(`A client requested the cityName and weather with the endpoint parameter ${city}`);
     let result = []
     result = searchByText(myCities, city)
    res.send(result)
    
})

//...................week 2 ...................................................................................

//post check
app.post('/', function (req, res) {
    console.log(req.fields);
    res.send('Yeah man got a post request')
  })

app.get('/citycrud/:id', function (req, res){
    const id = req.params.id;
    console.log(`A client requested the cityname and weather with the endpoint paremeter id ${id}`)
    let result = []
    result = searchByID(myCities, id)
    res.send(result)
})

//step 1 
app.post('/citycrud', function (req, res) {
    let newObject = req.fields
    myCities.push(newObject);
    res.send(myCities)
  })
  


//step 2 to check if the post works 

  app.get('/citycrud/', function (req, res){
    
    
    res.send(myCities)
})

//creating put endpoint
const searchByIDForPut = (mycities, myid) => {
    return mycities.findIndex(any => any.id == myid)
    
}
app.put('/citycrud/:idd', function (req, res) {
    const myId = req.params.idd;
    const updatedCities = req.fields;
    console.log(myId);
    console.log('updated' , updatedCities);
    
    
    
    let cityWithIdIndex = searchByIDForPut(myCities, parseInt(myId))
    console.log(cityWithIdIndex, 'hello');

    //1.creating a whole new duplicate object in reference to the id number given as a param....................................................................................................
    
    // let newObject;
    // if (updatedCities.latitude & updatedCities.longitude && updatedCities.weather && updatedCities.cityName && updatedCities.country && updatedCities.id){
    // newObject = {...myCities[cityWithIdIndex], latitude: updatedCities.latitude, longitude:updatedCities.longitude, id:updatedCities.id, cityName: updatedCities.cityName, country:updatedCities.country, weather:updatedCities.weather }
    // }
    // else {
    //     newObject = 'bullshit';
    // }

    //2.ultering the properties of the existing array elements partial or full...........................................................................................................................
    
    // if (cityWithIdIndex !== -1){
    //     if(updatedCities.cityName)
    //     myCities[cityWithIdIndex].cityName = updatedCities.cityName;
    //     if(updatedCities.latitude)
    //         myCities[cityWithIdIndex].latitude = updatedCities.latitude
    //     if(updatedCities.longitude)
    //         myCities[cityWithIdIndex].longitude = updatedCities.longitude;
    //     if(updatedCities.weather)
    //         myCities[cityWithIdIndex].weather = updatedCities.weather;
       
    // }
    //

    //3.altering the whole element of the given array...........................................................................................................
    myCities[cityWithIdIndex] = updatedCities;

    //how to produce a duplicate object from the array but only the values of those keys should change which we enter through the postman app.??

res.send(myCities)
  })
  
  

const searchByIdForDelete = (id, array) => {
    return array.findIndex(any => any.id == id)
}



// //creating delete endpoint 
app.delete('/citycrud/:id', function (req, res) {
    let id = req.params.id;
    let elementIndexToDelete = searchByIdForDelete(id, myCities);
    const deletedElement = myCities.splice(elementIndexToDelete,1)
    console.log(deletedElement);
    res.send(myCities)



   
  })











//what is the function of this code ??
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))