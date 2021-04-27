'use strict'
import { locService } from './loc.service.js'

const W_KEY = '5cc2af20f9064b14db9e3508bda4d057'


export const weatherService = {
    getWeather
}


function getWeather(lat = 31.952110800000003, lng = 34.906551) {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${W_KEY}`)
        .then(res => res.data)
        .then(resData => {
            return {
                temp: resData.temp,
                desc: resData.weather[0].description
            }
        })
}

//res.data.temp, res.data.weather[0].description

function doWeahter(idx) {
    if (!idx) {
        locService.getLocs().forEach(loc => {
            axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${W_KEY}`)
                .then(res => res.data)
                .then(resData => {
                    loc.weather = {
                        temp: resData.temp,
                        desc: resData.weather[0].description
                    }
                })
        })
    } else {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=${W_KEY}`)
            .then(res => res.data)
            .then(resData => {
                locService.getLocs()[idx].weather = {
                    temp: resData.temp,
                    desc: resData.weather[0].description
                }
            })
    }
}