import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { weatherService } from './services/weather.service.js'

window.onSearchLoc = onSearchLoc
window.onDeleteLoc = onDeleteLoc
window.onGoTo = onGoTo
window.onload = onInit;
// console.log('test')
// weatherService.getWeather()
console.log('', weatherService.getWeather());


function onInit() {
    mapService.initMap()
        .then(() => {
            // console.log('Map is ready');
            // console.log('locs', locService.getLocs());
            locService.addLoc(35.6895, 139.6917, 'tokio')
            locService.addLoc(35.235, 139.63421, 'tokio')
            locService.addLoc(35.854, 139.3455, 'tokio')
            console.log('test')
            renderTable()
            renderWeather()
            addEventListenrs();

        })
        .catch(() => console.log('Error: cannot init map'));
}

function renderTable() {
    const locs = locService.getLocs()
        // axios.all(locs).then(res => {

    var strHtml = locs.map((loc, idx) => {
        return `<tr>
            <td>${loc.name}</td>
            <td><button class="go-to-loc" onclick="onGoTo(${loc.lat}, ${loc.lng}, '${loc.locName}')" value="${loc.locName}">Go</button></td>
            <td><button class="delete-loc" onclick="onDeleteLoc(${idx})">Delete</button></td>
            </tr>`
    }).join('');
    document.querySelector('.locs-table tbody').innerHTML = strHtml
        // })
}

function addEventListenrs() {
    document.querySelector('.btn-pan').addEventListener('click', (ev) => {
        mapService.panTo(35.6895, 139.6917);
    })
    document.querySelector('.btn-add-marker').addEventListener('click', (ev) => {
        mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
    })
    document.querySelector('.btn-get-locs').addEventListener('click', (ev) => {
        locService.getLocs()
            .then(locs => {
                document.querySelector('.locs').innerText = JSON.stringify(locs)
            })

    })
    document.querySelector('.btn-user-pos').addEventListener('click', (ev) => {
        getPosition()
            .then(pos => {
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
    mapService.getMap().addListener('click', function(ev) {
        mapService.saveCurrCoordinates(ev.latLng.lat(), ev.latLng.lng())
        const position = {
            lat: mapService.getCurrPosition().lat,
            lng: mapService.getCurrPosition().lng
        }
        openModal()

    });

}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onDeleteLoc(idx) {
    locService.deleteLoc(idx)
    renderTable()
}

function renderWeather() {
    console.log(mapService.getCurrPosition().lat, mapService.getCurrPosition().lng, 'test')
    weatherService.getWeather(mapService.getCurrPosition().lat, mapService.getCurrPosition().lng)
        .then(res => {
            var elImg = document.querySelector('.weather-container img')
            var elTemp = document.querySelector('.weather-container .temp')
            var elDesc = document.querySelector('.weather-container .desc')
            const weather = {
                temp: res.main.temp,
                desc: res.weather[0].description,
                icon: res.weather[0].icon
            }
            elDesc.innerText = weather.desc
            elTemp.innerText = weather.temp
            elImg.src = weatherService.getWeatherIcon(weather.icon)
        })
}

function onGoTo(lat, lng, name) {
    renderWeather()
    mapService.goTo(lat, lng, name)
}

function openModal() {

    const { value: title } = Swal.fire({
        title: 'Enter your location name',
        input: 'text',
        inputLabel: 'Your location name',
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
                return 'You need to write something!'
            } else {
                locService.addLoc(mapService.getCurrPosition().lat, mapService.getCurrPosition().lng, value)
                mapService.addMarker({ lat: mapService.getCurrPosition().lat, lng: mapService.getCurrPosition().lng })
                renderWeather()
                renderTable()
            }
        }
    })

}

function onSearchLoc() {
    var searchInput = document.querySelector('input[name=searchLoc]').value
    mapService.searchLoc(searchInput)
}