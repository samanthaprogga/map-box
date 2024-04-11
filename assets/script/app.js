'use strict';

// Your MapBox access token //

const accessToken = 'pk.eyJ1IjoibmlzaGF0c2FtYW50YSIsImEiOiJjbHV0d2ZnYnYwM2YzMnFvdm5xdmIzZ3M3In0.mOM38IoFLEb692E9PTkQDw';


mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-74.5, 40], 
    zoom: 9 
});

let userMarker;

function trackDevice() {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, { enableHighAccuracy: true });
}

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    const zoomLevel = 17; 

    
    map.flyTo({
        center: [longitude, latitude],
        zoom: zoomLevel,
        speed: 1, 
        curve: 1, 
        essential: true 
    });


    if (userMarker) userMarker.remove();
    userMarker = new mapboxgl.Marker({
        color: '#4285F4', 
        element: createMarkerElement(),
        anchor: 'bottom' 
    }).setLngLat([longitude, latitude]).addTo(map);
}


function createMarkerElement() {
    const markerElement = document.createElement('div');
    markerElement.className = 'google-maps-marker';
    markerElement.style.width = '30px';
    markerElement.style.height = '48px';
    markerElement.style.backgroundImage = 'url("https://developers.google.com/maps/documentation/javascript/images/marker_green.png")'; // URL of Google Maps pin icon
    markerElement.style.backgroundSize = 'cover';
    return markerElement;
}

function errorLocation() {
    console.error('Unable to retrieve your location');
}


document.getElementById('trackButton').addEventListener('click', trackDevice);
