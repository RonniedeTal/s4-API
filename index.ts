const weather=document.getElementById("weather") as HTMLElement


document.addEventListener("DOMContentLoaded",()=>{
bringWeather()

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