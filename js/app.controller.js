import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onload = onInit;
console.log('test')
weatherService.getWeather()

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            addEventListenrs();
        })
        .catch(() => console.log('Error: cannot init map'));
}

function addEventListenrs() {
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        console.log('Panning the Map');
        mapService.panTo(35.6895, 139.6917);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        console.log('Adding a marker');
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                console.log('Locations:', locs)
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
                console.log('User position is:', pos.coords);
                document.querySelector('.user-pos').innerText =
                    `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
                mapService.panTo(pos.coords.latitude, pos.coords.longitude)

                const position = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                }
                mapService.addMarker(position)
            })
            .catch(err => {
                console.log('err!!!', err);
            })
    })
    var map = mapService.getMap()
    console.log(map)
    mapService.getMap().addListener('click', function(ev) {
        console.log(map)
        mapService.saveCurrCoordinates(ev.latLng.lat(), ev.latLng.lng())
        const position = {
            lat: mapService.getCurrPosition().lat,
            lng: mapService.getCurrPosition().lng
        }
        mapService.addMarker(position)

    });

}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}