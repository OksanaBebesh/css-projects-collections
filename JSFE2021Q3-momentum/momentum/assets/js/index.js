const timeContainer = document.querySelector('.time');
const dateContainer = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting');
const nameContainer = document.querySelector('.greeting-container .name');
const sliderIconPrev = document.querySelector('.slide-prev');
const sliderIconNext = document.querySelector('.slide-next');

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

const city = document.querySelector('.city');
const audio = new Audio();
const btnAudioPlay = document.querySelector('.play');
const btnAudioPause = document.querySelector('.pause');
const playPrev = document.querySelector('play-prev');
const playNext = document.querySelector('play-next');

localStorage.setItem('audioTrack',0);
const mediaList = [
    "Aqua Caelestis",
    "Ennio Morricone",
    "River Flows In You",
    "Summer Wind"
]


const audioPlay = (song) => {
    audio.src = song;
    audio.currentTime = 0;
    audio.play();
}

const audioPause = () => {
    audio.pause();
}

const showTime = () => {
    const time = new Date();
    const currentTime = time.toLocaleTimeString();
    timeContainer.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime,1000);
}

const showDate = () => {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-By', options);
    dateContainer.textContent = currentDate;
}

const showGreeting = () => {
    greetingContainer.textContent = `Good ${getTimeOfDay()}!`;
    // nameContainer.focus();
}

const getTimeOfDay = () => {
    const date = new Date();
    const hours = date.getHours();
    let result = "";
    switch(true){
        case  hours >= 6  && hours <=11 : {
            result =  "morning";
            break;
        }

        case hours >= 12 && hours <= 18 : {
            result = "day";
            break;
        }

        case hours >= 19 && hours <= 24 : {
            result = "evening";
            break;
        }

        case hours >= 1 && hours <= 6 :{
            result = "night";
            break;
        }

    }
    return result;
}

const setName = (e) => {
    localStorage.setItem('pearsonName',e.target.value);
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
}

const setBg = (urlRandom)=>{
    const img = new Image();
    img.src = urlRandom;
    img.onload = () => {
          document.body.style.backgroundImage = `url('${urlRandom}')`;
    }
}

async function getLinkToImage(){
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=GPzQ6QgWSWTzVCzMBiRmwPqJBEW9POVZ1hfObOomcRs`;
    const response = await fetch(url);
    const data = await response.json();

    return  data.urls.raw;
}

async function getWeather(){

    const cityName = city.value || "Минск";
    city.value = cityName;
    const lang = "ru";
    const units= "metric";
    const apiKey = "c7f59587e6113ea979e017b9909215a0";
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${lang}&appid=${apiKey}&units=${units}`;
    const response = await fetch(urlWeather);
    const dataWeather = await response.json();

    weatherIcon.classList.add(`owf-${dataWeather.weather[0].id}`);
    temperature.textContent = `${dataWeather.main.temp}°C`;
    weatherDescription.textContent = dataWeather.weather[0].description;
}

async function getQuotes(){

    const quotes = "assets/js/quote.json";
    const response = await fetch(quotes);
    const dataQuotes = await response.json();
    const chooseQuote = getRandomInt(dataQuotes.length);
        quote.innerHTML = `"${dataQuotes[chooseQuote].quote}"`;
        author.innerHTML = dataQuotes[chooseQuote].author;
}


document.body.onload = () => {
    document.body.style.backgroundImage = "url('assets/img/bg.jpg')";
    getLinkToImage().then(setBg);
    getWeather().then();
    getQuotes().then();
};

const swipeBgImage = () =>{
    getLinkToImage().then(setBg);
}

showTime();

nameContainer.addEventListener('change',setName);
sliderIconPrev.addEventListener('click',swipeBgImage);
sliderIconNext.addEventListener('click',swipeBgImage);

changeQuote.addEventListener('click',getQuotes);
city.addEventListener('change',getWeather)
nameContainer.value = localStorage.getItem('pearsonName');


