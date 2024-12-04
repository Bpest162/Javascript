"use strict"

window.addEventListener('load', ()=>{
    initialize();
    
    if(!handleFetchWithCoords(fetchWeatherData)){
        fetchWeatherData(50.433334, 30.516666)
    } 
})

const input = document.getElementById('mySearch');

function initialize() {
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setTypes(['(cities)']);
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            return;
        }
        if(input.value !== ''){
            isCleaner.classList.add('isCleaner'); 
        } 
        if(input.value == ''){
            isCleaner.classList.remove('isCleaner');
        }

        const lat = place.geometry.location.lat();
        const lon = place.geometry.location.lng();
        const selection = document.getElementById("selection");
        selection.innerHTML = "Celected: " + input.value;
        
        fetchWeatherData(lat, lon);
        //console.log(lat, lon);
    }); 
}

const isCleaner = document.getElementById("isCleaner");
isCleaner.addEventListener('click', () =>{
    input.value = '';
});

function handleFetchWithCoords(callback) { //функция для запроса определения местоположения пользователя по координатам
    navigator?.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        callback(lat, lon);
    });
};

function fetchWeatherData(lat, lon) { //функция вызова данных на текуший день и на пять дней 
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=210986cd22248da2202070d02860e139`
      )
        .then((response) => response.json())
        .then((data) => {
            displayCurrentWeather(data);
            getForecastWeather(data);
            console.log(data);
        })
        .catch((err) =>
          alert("Something Went Wrong: Try again!")
        );
};

function displayCurrentWeather(data) { //функция для вывода текщей погоды (мин макс температуры итд)
    const weatherInfo = Object.entries(data);
    const weatherList = weatherInfo[3][1];
    const currenWeather = weatherList[0];
    const feelsLike = currenWeather.main.feels_like;
    const tempMin = currenWeather.main.temp_min;
    const main = currenWeather.weather[0].main;
    const description = currenWeather.weather[0].description;
    const icons = currenWeather.weather[0].icon;
    const city = data.city.name;
    const country = data.city.country;

    const regionNames = new Intl.DisplayNames(["en"], { type: "region" });//Объект Intl.DisplayNames позволяет локализовать названия, в частности, названия стран и регионов. ["en"]- язык на котором будет выводится информация
    const countryName = regionNames.of(country); //применяем метод of и получаем полное название страны по коду

    const mainDisplay = document.getElementById("main-display");
    mainDisplay.classList.add('main-display');
    
    document.getElementById("city-name-re").innerHTML = city + ', ' + countryName;    
    document.getElementById("fill-temp").innerHTML = Math.round(feelsLike) + "°C";
    document.getElementById("max-temp").innerHTML = Math.round(tempMin) + "°C";
    document.getElementById("main-desc").innerHTML = main;
    document.querySelector("#main-desc2").innerHTML = description;
    document.querySelector("#weather-icon").src = `img/${icons}.png`;

    //console.log(weatherInfo);
};

function getForecastWeather(data) { //функция для получения данных на указанное время. также получаем дату и день недели
    const nextDays = data.list.filter(
        (item) => item.dt_txt.substr(0, 10) !== new Date().toJSON().slice(0, 10) //используем метод substr() чтобы вернуть указанное количество символов из строки //также использем метод toJSON() чтобы вернуть строку, отформатированную в JSON 
    );
    const nextDaysMinTemp = nextDays.filter((item) => 
        item.dt_txt.endsWith("03:00:00")
    );
    const nextDaysMaxTemp = nextDays.filter((item) =>
        item.dt_txt.endsWith("12:00:00")
    );
    const nextDaysWeatherData = nextDaysMaxTemp.map((item, index) => {
        const weekDay = getWeekDay(item.dt_txt);
    
        const maxTemp = Math.round(item.main.temp_max); //используем метод Math.round() для округления чисел к ближайщему целому
        const minTemp = Math.round(nextDaysMinTemp[index].main.temp_min);
        const { icon, description } = item.weather[0];
  
        return {
                weekDay,
                minTemp,
                maxTemp,
                icon,  //испльзовал для иконок, значение main, используется в названиях иконок, чтобы иконки ставились согласно описанию
                description,
        };
    });
    outputForecastList(nextDaysWeatherData);
};
  
function outputForecastList(data) { //функция для вывода прогноза на пять дней
    const list = document.querySelector(".forecast");
    list.innerHTML = "";
    data.forEach((item) => {
        const { weekDay, minTemp, maxTemp, icon, description } = item;
        const liNode = document.createElement("li");
        liNode.classList.add("forecast-items");
        liNode.innerHTML = `
            <div class="day-forecast">
                <h2 class="days">${weekDay}</h2>
                <img class="icon" src="img/${icon}.png" alt=""> 
                <div class="icon-desc">
                    <h3 class="day-term">${description}</h3>
                </div>
                
                <div class="day-night">
                    <p class="day">day</p>
                    <h4 class="day-temp">${maxTemp}°C</h4>
                    <h4 class="night-temp">${minTemp}°C</h4>
                    <p class="night">night</p>
                </div>
            </div>
            `;
        list.append(liNode); //используем метод append() чтобы вставить  эелементы последовательно 
    });
};
  
function getWeekDay(timestamp) {
    const options = { weekday: "short" };
  
    const date = new Date(timestamp);
  
    const weekDay = new Intl.DateTimeFormat("en-US", options).format(date);//объект, содержащий функцию форматирования даты и времени с учётом локали
    return weekDay;
}; 
  




















