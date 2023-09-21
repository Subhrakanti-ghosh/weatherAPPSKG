const express = require("express");

// https is needed for api calls.
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res)
{
 res.sendFile(__dirname + "/index.html");

});

// to get the post req from the form submission and then get the cityname by bodyparser
//req.body.cityNmae, then make the api call.
app.post("/", function(req,res){
  const query = req.body.cityName;
  console.log(query);
  apikey = "246dea5e126d414ce79d580b40baffb4";
  const unit = "metric";
  // "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
  https.get(url, function(response)
  {
    // the response, for which the call back function is triggered.
     console.log(response.statusCode);
     response.on("data", function(data)
     {
       
         // JSON.parse(data) basically transforms the data into js object.
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temp = weatherData.main.temp;
        const weatherReport = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageUrl =  "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
        console.log(weatherData);
        // console.log(temp);
        // console.log(weatherReport);
        res.write("<p>the weather in  "  +   query  +  "   is now: " + weatherReport+ "</p>");
        res.write("<h1>the temparature in  "  +   query   +   "  is " + temp + "degree celsius</h1>");
        res.write("<img src=" + imageUrl +">");
        res.send();
    
     })
  })
});






app.listen(3500,function()
{
 console.log("server is running on port 3500......");
});