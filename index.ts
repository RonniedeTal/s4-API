const weather = document.getElementById("weather") as HTMLElement
const jokes = document.getElementById("jokes") as HTMLElement
const button = document.querySelector<HTMLButtonElement>("button")
const rankingData: { joke: string, score: number, date: string }[] = []
const rankingButton = document.querySelector<HTMLButtonElement>(".buttonB")
let jokeData: string = ""
console.log(rankingData);

document.addEventListener("DOMContentLoaded", () => {
    bringWeather()
    bringAJoke()

}, false)

const bringWeather = async (): Promise<void> => {
    try {
        const response = await fetch(`https://www.el-tiempo.net/api/json/v2/home`)
        const data = await response.json()
        createWeather(data)
    } catch (error) {
        handleError((error as Error).message)
    }
}

const createWeather = (weatherData: any): void => {
    if (weather) {
        weather.innerHTML = "";

        const weatherToday = document.createElement("h6")
        weatherToday.innerHTML = `Hoy en Barcelona, ${weatherData.ciudades[0].stateSky.description}`

        const div = document.createElement("div")
        div.appendChild(weatherToday)

        weather.appendChild(div)
    }
}

button?.addEventListener("click", (e) => {
    e.preventDefault()
    bringAJoke()
})

const bringAJoke = async (): Promise<void> => {
    const randomApi = Math.round(Math.random())
    if (randomApi % 2 == 0) {
        try {
            const response = await fetch(`https://icanhazdadjoke.com/`, { headers: { Accept: 'application/json' } })
            const data = await response.json()
            jokeData = data.joke
            createAjoke(data.joke)

        } catch (error) {
            handleError((error as Error).message)
        }
    } else {
        try {
            const response = await fetch(`https://api.chucknorris.io/jokes/random`)
            const data = await response.json()
            jokeData = data.value
            createAjoke(data.value)
        } catch (error) {
            handleError((error as Error).message)
        }
    }

}

const createAjoke = (jokeData: any): void => {
    if (jokes) {
        jokes.innerHTML = "";

        const joke = document.createElement("h4")
        joke.innerHTML = jokeData

        const div = document.createElement("div")
        div.appendChild(joke)

        jokes.appendChild(div)
    }

}

rankingButton?.addEventListener("click", (e) => {
    e.preventDefault()

    let rankingJoke = (<HTMLInputElement>document.querySelector(`input[name=jokeRanking]:checked`)).value;
    const addJoke = rankingData.find(item => item.joke == jokeData)
    if (rankingJoke == "good") {

        if (addJoke) {
            addJoke.score = +3
            addJoke.date = new Date().toISOString()
        } else {
            rankingData.push({ joke: jokeData, score: 3, date: new Date().toISOString() })
        }
    } else if (rankingJoke == "regular") {

        if (addJoke) {
            addJoke.score = +2
            addJoke.date = new Date().toISOString()
        } else {
            rankingData.push({ joke: jokeData, score: 2, date: new Date().toISOString() })
        }
    } else if (rankingJoke == "bad") {

        if (addJoke) {
            addJoke.score = +1
            addJoke.date = new Date().toISOString()
        } else {
            rankingData.push({ joke: jokeData, score: 1, date: new Date().toISOString() })
        }
    }

})

const handleError = (message: string): void => {
    message = "ups something goes wrong, try it later"
    alert(`${message}`)
}