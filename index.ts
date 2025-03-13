const weather=document.getElementById("weather") as HTMLElement
const jokes=document.getElementById("jokes") as HTMLElement
const button= document.querySelector<HTMLButtonElement>("button")


document.addEventListener("DOMContentLoaded",()=>{
bringWeather()
bringAJoke()

},false)

const bringWeather=async():Promise<void>=>{
    try {
        const response=await fetch(`https://www.el-tiempo.net/api/json/v2/home`)
        const data=await response.json()
        createWeather(data)
    } catch (error) {
        
    }
}

const createWeather=(weatherData:any):void=>{
if(weather){
    weather.innerHTML="";

    const weatherToday=document.createElement("h6")
    weatherToday.innerHTML=`Hoy en Barcelona, ${weatherData.ciudades[0].stateSky.description}`
    const div=document.createElement("div")
    div.appendChild(weatherToday)
    weather.appendChild(div)
            }
}

button?.addEventListener("click",(e)=>{
    e.preventDefault()
    bringAJoke()
})

const bringAJoke=async():Promise<void>=>{
    try {
        const response=await fetch(`https://icanhazdadjoke.com/`,{ headers:{ Accept: 'application/json' }})
        const data=await response.json()
        console.log(data);
        createAjoke(data)
       
        
    } catch (error) {
        
    }
}

const createAjoke=(jokeData:any):void=>{
    if(jokes){
        jokes.innerHTML="";

        const joke=document.createElement("h3")
        joke.innerHTML=jokeData.joke

        const div=document.createElement("div")
        div.appendChild(joke)

        jokes.appendChild(div)
    }

}