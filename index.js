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
        // const data=await response.json()
        console.log(data);
        // createAjoke(data)
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
const handleError = (message) => {
    message = "ups something goes wrong, try it later";
    alert(`${message}`);
};
