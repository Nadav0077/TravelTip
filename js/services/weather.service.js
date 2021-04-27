'use strict'

const W_KEY = '5cc2af20f9064b14db9e3508bda4d057'

export const weatherService = {
    getWeather
}


function getWeather(lat = 31.952110800000003, lng = 34.906551) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${W_KEY}`).then(res => { res.data.temp, res.data.weather[0].description });

}