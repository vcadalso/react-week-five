import React, {useState} from "react";
import axios from "axios";
import "./Weather.css";


export default function Weather(props){
   
    const [weatherData, setWeatherData] = useState({ ready: false});
    const [city, setCity] = useState(props.defaultCity);
    
    function handleResponse(response) {
    
    setWeatherData ({
        ready: true,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description:response.data.weather[0].description,
        date: "Wednesday",
        icon: response.data.weather[0].icon,
        wind: response.data.wind.speed,
        city: response.data.name
         

    });
   
}

    function handleSubmit(event) {
        event.preventDefault();
        search();
    }

    function handleCityChange(event) {
        setCity(event.target.value);
    }

    function search(){
        const apiKey = "7ec6cfda8f591b50cc9d9a66906e1455";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl)
        .then(handleResponse)
        .catch(error => {
                console.error("Error fetching weather data:", error);
                setWeatherData({ ready: false });
            });
    }

    if (weatherData.ready) {
        return (
        <div className="Weather">
            <form onSubmit={handleSubmit}>
                <div className="row">
                <div className="col-9">
                <input 
                type="search" 
                placeholder= "Enter a city.." 
                className="form-control" 
                autoFocus="on"
                onChange={handleCityChange}
                />
                </div>
                <div className="col-3">
                    <input 
                    type="submit" 
                    value="Search" 
                    className="btn btn-primary w-100"
                    />
                </div>
                </div>
            </form>
            
            </div>
        );

    } else {
        search();
        return "Loading..."

    }

    
    
}