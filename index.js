const form = document.querySelector('form')
const searchBar = document.querySelector('#searchBar')
const submitBtn = document.querySelector('#submitBtn')
const CToFBtn = document.querySelector('.CToF')
const cityName = document.querySelector('.cityName')
const weather = document.querySelector('.weather')
const tempTotal = document.querySelector('.tempTotal')
const feelsLike = document.querySelector('.feelsLike')
const tempMin = document.querySelector('.tempMin')
const tempMax = document.querySelector('.tempMax')
const humidity = document.querySelector('.humidity')
const windSpeed = document.querySelector('.windSpeed')
const pressure = document.querySelector('.pressure')
const sunrise = document.querySelector('.sunrise')
const sunset = document.querySelector('.sunset')

window.onload = getData('Lisbon')
form.addEventListener('submit', handleSubmit)
submitBtn.addEventListener('click', () => {
    const city = searchBar.value
    getData(city)
})

function reset() {
    form.reset()
}

function handleSubmit(e){
    e.preventDefault()
}

function formatTime(time) {
    const date = new Date(time * 1000)
    const hours = date.getHours().toString().padStart(2,'0')
    const minutes = date.getMinutes().toString().padStart(2,'0')
    return `${hours}:${minutes}`
}

async function getData(city){
try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ef0b709f75a494fbf84fa310c76d71a3`,
        {
            mode: 'cors',
        }
    );
    const data = await response.json()
    displayBg(data)
    console.log(data)
    const newData = addData(data)
    displayData(newData)
    } catch(error) {
        console.error(error);
    }
    reset()
}

function displayBg(data) {
    
    switch (data.weather[0].main) {
        case "Clear":
            document.body.style.backgroundImage = 'url("./Images/bgs/clear.webp")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage = 'url("./Images/bgs/cloudy.webp")';
            break;
        case 'Rain':
        case 'Drizzle':
            document.body.style.backgroundImage = 'url("./Images/bgs/rainy.webp")';
            break;
        case 'Mist':
        case 'Haze':
        case 'Fog':
            document.body.style.backgroundImage = 'url("./Images/bgs/misty.webp")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("./Images/bgs/thunderstorm.webp")';
            break;
        case 'Snow':
            document.body.style.backgroundImage = 'url("./Images/bgs/snow.webp")';
            break;
        default:  
            break;
    }
}

function addData(data) {
    const fetchedData = {
        city: data.name,
        date: data.dt,
        country: data.sys.country,
        weather: data.weather[0].main,
        tempTotal: {
            c: Math.round(data.main.temp - 273.15),
            f: Math.round(((data.main.temp - 273.15)* 9/5) + 32),
        }, 
        feelsLike: {
            c: Math.round(data.main.feels_like - 273.15),
            f: Math.round(((data.main.feels_like - 273.15) * 9/5)+32),
        },
        tempMin: {
            c: Math.round(data.main.temp_min - 273.15),
            f: Math.round(((data.main.temp_min - 273.15) * 9/5)+32),
        },
        tempMax: {
            c: Math.round(data.main.temp_max - 273.15),
            f: Math.round(((data.main.temp_max - 273.15) * 9/5)+32),
        },
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        pressure: data.main.pressure,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
    }

    return fetchedData
}

function displayData(data) {
    let celsius = true
    cityName.textContent = `${data.city}, ${data.country}`; 
    weather.textContent = `${data.weather}`;
    CToFBtn.addEventListener('click', () => {
        celsius = !celsius
        if (!celsius) {
            CToFBtn.textContent = `Switch to Cº`
            tempTotal.textContent = `${data.tempTotal.f} ºF`;
            feelsLike.textContent = `Feels Like: ${data.feelsLike.f} ºF`;
            tempMin.textContent = `${data.tempMin.f} ºF`;
            tempMax.textContent = `${data.tempMax.f} ºF`;  
        }  
        else {
            CToFBtn.textContent = `Switch to Fº`
            tempTotal.textContent = `${data.tempTotal.c} ºC`;
            feelsLike.textContent = `Feels Like: ${data.feelsLike.c} ºC`;
            tempMin.textContent = `${data.tempMin.c} ºC`;
            tempMax.textContent = `${data.tempMax.c} ºC`;
        }
    })
    tempTotal.textContent = `${data.tempTotal.c} ºC`;
    feelsLike.textContent = `Feels Like: ${data.feelsLike.c} ºC`;
    tempMin.textContent = `${data.tempMin.c} ºC`;
    tempMax.textContent = `${data.tempMax.c} ºC`;
    humidity.textContent = `Humidity: ${data.humidity} %`;
    windSpeed.textContent = `Wind Speed: ${data.windSpeed} km/s`;
    pressure.textContent = `Pressure: ${data.pressure} hPa`
    sunrise.textContent = 'Sunrise: ' + formatTime(data.sunrise) 
    sunset.textContent = 'Sunset: ' + formatTime(data.sunset)
}


