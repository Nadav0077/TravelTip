'use strict'

import { weatherService } from './weather.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}
var locs = [

]

function getLocs() {
    return locs;
}

function addLoc(lat, lng, name) {
    // weatherService.getWeather()
    //     .then(res => {

    //         const weather = {
    //             temp: res.main.temp,
    //             desc: res.weather[0].description
    //         }
    locs.push({
            id: utilService.makeId(),
            name,
            lat,
            lng,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        // })
}

function deleteLoc(idx) {
    locs.splice(idx, 1)
}