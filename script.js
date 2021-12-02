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
const imaginaryCords = [35.7538071,51.4307275,21];

class App {
    #map;
    #mapEvent;
    constructor(){
        this._loadMap(imaginaryCords);
        form.addEventListener('submit', this._newWorkout.bind(this));
        inputType.addEventListener('change', this._toggleElevationField());
    }

    _getPosition(){
        //Checking if Browser supports geolocation or NOT
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(pos){
                const {latitude} = pos.coords;
                const {longitude} = pos.coords;
            }, function(){
                alert("Failed to get location")
            });
        }
    }

        _loadMap(position){
        this.#map = L.map('map').setView(position, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        //Handling Clicks on Map
        this.#map.on('click', this._showForm.bind(this));
}

    _showForm(mapE){
        this.#mapEvent = mapE;
        form.classList.remove('hidden');
        inputDistance.focus();
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    }

    _newWorkout(e){
        e.preventDefault();
        //Clearing input fields
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
    
        //Display Marker
        const {lat, lng} = this.#mapEvent.latlng;
        L.marker([lat, lng])
        .addTo(this.#map)
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
    }

}

const app = new App();








