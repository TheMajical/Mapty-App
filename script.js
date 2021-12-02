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

class Workout{
    date = new Date();
    id = (Date.now() + ' ').slice(-10);

    constructor(coords, distance, duration){
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence){
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
    }

    calcPace(){
        this.pace = this.duration / this.distance ;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain){
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
    }   

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

////////////////////////////////////////////////
//Application
class App {
    #map;
    #mapEvent;
    #workouts = [];

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
        //Validating method
        const validInputs = (...inputs) => 
            inputs.every(inp => Number.isFinite(inp));

        const positiveInputs = (...inputs) => 
            inputs.every(inp => inp > 0);

        e.preventDefault();

        
        const type = inputType.value;
        const duration = +inputDuration.value;
        const distance = +inputDistance.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        if (type === 'running') {
            const cadence = +inputCadence.value;

            if(
                !validInputs(distance, duration,  cadence) && 
                !positiveInputs(distance, duration,  cadence)
            )
                return alert('Inputs must be positive numbers');

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (type === 'cycling'){
            const elevation = +inputElevation.value;

            if(
                !validInputs(duration, distance, elevation) && 
                !positiveInputs(duration, distance)
            )
                return alert('Inputs must be positive numbers');

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        //Add new object to workouts array
        this.#workouts.push(workout);
        //Clearing input fields
        inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = '';
        //Rendering a marker on the map
        this._renderWorkoutMarker(workout);
        
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: true,
            className: `${workout.type}-popup`
        })
        )
        .setPopupContent(`Workout`)
        .openPopup();
    }

}

const app = new App();


