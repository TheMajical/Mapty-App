'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


//Checking if Browser supports geolocation or NOT
// if (navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(function(pos){
//         const {latitude} = pos.coords;
//         const {longitude} = pos.coords;
//         console.log(lattitude, longtitude);
//     }, function(){
//         alert("Failed to get location!")
//     });
// }
let map,mapEvent;
const imaginaryCords = [35.7538071,51.4307275,21];
map = L.map('map').setView(imaginaryCords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click', function(mapE){
    mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    //Clearing input fields
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';

    //Display Marker
    const {lat, lng} = mapEvent.latlng;
    L.marker([lat, lng])
    .addTo(map)
    .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: true,
        className: 'running-popup'
    })
    )
    .setPopupContent(`Workout`)
    .openPopup();

})

inputType.addEventListener('change', function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})


