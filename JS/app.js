const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const timeImg = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    console.log(data);
    // const cityDetails = data.cityDetails;
    // const weather = data.weather;

    // destructuring
    const { cityDetails, weather } = data;

    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${Math.floor(weather.Temperature.Metric.Value)}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update day/night img and icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // ternary operator
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    timeImg.setAttribute('src', timeSrc);

    // check if d-none is present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    // prevent page refresh
    e.preventDefault()

    // get input value (city)
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update UI with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        // .then(data => console.log(data))
        .catch(err => console.log(err));

    // store latest city in local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
