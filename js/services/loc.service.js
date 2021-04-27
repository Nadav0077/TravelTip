'use strict'

import { weatherService } from './weather.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLoc
}
var locs = [

]

function getLocs() {
    return locs;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve(locs);
    //     }, 2000)
    // });
}

function addLoc(lat, lng, name) {
    weatherService.getWeather()
        .then(res => {

            const weather = {
                temp: res.main.temp,
                desc: res.weather[0].description
            }
            locs.push({
                id: utilService.makeId(),
                name,
                lat,
                lng,
                weather,
                createdAt: Date.now(),
                updatedAt: Date.now()
            })
        })
}