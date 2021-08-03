function getWeather(){
    var cityName = document.querySelector(".inputText").value;
    var dateName = document.querySelector(".inputDate").value;

    fetch("https://meta-weather.vercel.app/api/location/search/?query="+cityName)
        .then(function weather(data){
            return data.json();
        })
        .then(function weather(data){
            var woeId = data[0].woeid;


            fetch("https://meta-weather.vercel.app/api/location/"+woeId+"/"+dateName+"/")
                .then(function weather(data){
                    return data.json();
                })
                .then(function weather(data){
                    console.log(data)
                    
                    var weatherData = data[0];
                    var date = getDate(weatherData.created);
                    var generalWeather = weatherData.weather_state_name;
                    var temp = weatherData.the_temp;
                    var humidity  = weatherData.humidity;
                    var wind = weatherData.wind_speed;

                    
                    console.log(cityName, date, generalWeather, temp, humidity, wind);

                    var cityElement = document.querySelector(".city-name");
                    cityElement.textContent = cityName;


                    var subtitleTextElement = document.querySelector(".subtitle");
                    subtitleTextElement.textContent = date + ", " + generalWeather;

                    var tempElement = document.querySelector(".temperature");
                    tempElement.textContent = parseInt(temp) + "° C";
                    
                    var humidityEl = document.querySelector("#humidity");
                    humidityEl.textContent = "humidity: " + humidity + "%";

                    var windEl = document.querySelector("#wind");
                    windEl.textContent = "wind: " + parseInt(wind) + " Km/h"
                })

        })

}




function getDate(dateString){
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    return `${days[d.getDay()]}, ${d.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric'})}`;
}