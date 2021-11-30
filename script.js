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

const imaginaryCords = [35.7538071,51.4307275,21];
var map = L.map('map').setView(imaginaryCords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker(imaginaryCords).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();