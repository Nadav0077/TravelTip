'use strict'

import { weatherService } from './weather.service.js'
import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLoc
}
var locs = [,
    { name: 'Loc1', lat: 32.047104, lng: 34.832384 },
    { name: 'Loc2', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}

function addLoc(lat, lng) {
    locs.push({
        id: utilService.makeId(),
        name,
        lat,
        lng,
        weather: weatherService.getWeather(lat, lng),
        createdAt: Date.now(),
        updatedAt: Date.now()
    })
}