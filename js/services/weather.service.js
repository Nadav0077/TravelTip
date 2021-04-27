'use strict'

const W_KEY = '5cc2af20f9064b14db9e3508bda4d057'

export const weatherService = {
    getWeather
}


function getWeather(lat = 32.0749831, lng = 34.9120554) {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${W_KEY}`).then(res => res.data);

}