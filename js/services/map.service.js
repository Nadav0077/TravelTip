export const mapService = {
    initMap,
    addMarker,
    panTo,
    saveCurrCoordinates,
    getCurrPosition,
    getMap,
    goTo,
    searchLoc
}

const API_KEY = 'AIzaSyCP9zcFyyVF3srMX1Ay1XF8S-X13086A4Q';
var gLat
var gLng

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
    saveCurrCoordinates(lat, lng)
    return _connectGoogleApi()
        .then(() => {
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', gMap);
        })
}

function addMarker(loc, name = "location") {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });

    console.log('marker', loc)
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
        //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}


function saveCurrCoordinates(lat, lng) {
    gLat = lat;
    gLng = lng;
}

function getCurrPosition() {
    return { lat: gLat, lng: gLng }
}

function getMap() {
    return gMap;
}

function goTo(lat, lng, title) {
    saveCurrCoordinates(lat, lng)
    panTo(lat, lng)
    addMarker({ lat, lng }, title)
}

function searchLoc(adress) {
    axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${adress}&key=${API_KEY}`).then(
        res => {
            if (res.data.results.length === 0) {
                return
            } else {
                console.log(res.data.results[0].geometry.location)
                var loc = res.data.results[0].geometry.location
                console.log(loc)
                goTo(loc.lat, loc.lng, res.data.results[0].formatted_address)
            }
        }
    )
}