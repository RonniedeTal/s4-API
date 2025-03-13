"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const weather = document.getElementById("weather");
const jokes = document.getElementById("jokes");
const button = document.querySelector("button");
const rankingData = [];
const rankingButton = document.querySelector(".buttonB");
let jokeData = "";
console.log(rankingData);
document.addEventListener("DOMContentLoaded", () => {
    bringWeather();
    bringAJoke();
}, false);
const bringWeather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://www.el-tiempo.net/api/json/v2/home`);
        const data = yield response.json();
        createWeather(data);
    }
    catch (error) {
        handleError(error.message);
    }
});
const createWeather = (weatherData) => {
    if (weather) {
        weather.innerHTML = "";
        const weatherToday = document.createElement("h6");
        weatherToday.innerHTML = `Hoy en Barcelona, ${weatherData.ciudades[0].stateSky.description}`;
        const div = document.createElement("div");
        div.appendChild(weatherToday);
        weather.appendChild(div);
    }
};
button === null || button === void 0 ? void 0 : button.addEventListener("click", (e) => {
    e.preventDefault();
    bringAJoke();
});
const bringAJoke = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://icanhazdadjoke.com/`, { headers: { Accept: 'application/json' } });
        const data = yield response.json();
        console.log(data);
        jokeData = data.joke;
        createAjoke(data);
    }
    catch (error) {
        handleError(error.message);
    }
});
const createAjoke = (jokeData) => {
    if (jokes) {
        jokes.innerHTML = "";
        const joke = document.createElement("h3");
        joke.innerHTML = jokeData.joke;
        const div = document.createElement("div");
        div.appendChild(joke);
        jokes.appendChild(div);
    }
};
rankingButton === null || rankingButton === void 0 ? void 0 : rankingButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("hola");
    let rankingJoke = document.querySelector(`input[name=jokeRanking]:checked`).value;
    const addJoke = rankingData.find(item => item.joke == jokeData);
    if (rankingJoke == "good") {
        console.log("vamos");
        if (addJoke) {
            addJoke.score = +3;
            addJoke.date = new Date().toISOString();
        }
        else {
            rankingData.push({ joke: jokeData, score: 3, date: new Date().toISOString() });
        }
    }
    else if (rankingJoke == "regular") {
        if (addJoke) {
            addJoke.score = +2;
            addJoke.date = new Date().toISOString();
        }
        else {
            rankingData.push({ joke: jokeData, score: 2, date: new Date().toISOString() });
        }
    }
    else if (rankingJoke == "bad") {
        if (addJoke) {
            addJoke.score = +1;
            addJoke.date = new Date().toISOString();
        }
        else {
            rankingData.push({ joke: jokeData, score: 1, date: new Date().toISOString() });
        }
    }
});
const handleError = (message) => {
    message = "ups something goes wrong, try it later";
    alert(`${message}`);
};
