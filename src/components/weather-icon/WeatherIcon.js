import { useEffect, useState } from 'react'

// styles
import './WeatherIcon.scss'

// assets
import clearIconDay from '../../assets/weather/clear-day.png'
import clearIconNight from '../../assets/weather/clear-night.png'
import cloudyIconDay from '../../assets/weather/cloudy-day.png'
import cloudyIconNight from '../../assets/weather/cloudy-night.png'
import drizzleIcon from '../../assets/weather/drizzle.png'
import dustIcon from '../../assets/weather/dust.png'
import fogIcon from '../../assets/weather/fog.png'
import hazeIcon from '../../assets/weather/haze.png'
import rainIcon from '../../assets/weather/rain.png'
import smokeIcon from '../../assets/weather/smoke.png'
import snowIcon from '../../assets/weather/snow.png'
import thunderstormsIcon from '../../assets/weather/thunderstorms.png'
import tornadoIcon from '../../assets/weather/tornado.png'

const weatherTypes = {
    'clearDay': clearIconDay,
    'clearNight': clearIconNight, 
    'cloudyDay': cloudyIconDay, 
    'cloudyNight': cloudyIconNight, 
    'drizzle': drizzleIcon, 
    'dust': dustIcon, 
    'fog': fogIcon, 
    'haze': hazeIcon, 
    'rain': rainIcon, 
    'smoke': smokeIcon, 
    'snow': snowIcon, 
    'thunderstorms': thunderstormsIcon, 
    'tornado': tornadoIcon
}

export default function WeatherIcon({ type, sunsetTime }) {
    const [currWeatherIcon, setCurrWeatherIcon] = useState(null)

    useEffect(() => {
        let isDay = null
        console.log(type)
        if (sunsetTime + 3600000 < Date.now()) {
            isDay = true
        } else {
            isDay = false
        }

        switch (type) {
            case 'Clear':
                if (isDay) {
                    setCurrWeatherIcon(weatherTypes.clearDay)
                } else {
                    setCurrWeatherIcon(weatherTypes.clearNight)
                }
                break
            case 'Fog':
                setCurrWeatherIcon(weatherTypes.fog)
                break
            case 'Rain':
                setCurrWeatherIcon(weatherTypes.rain)
                break
            case 'Clouds':
                if (isDay) {
                    setCurrWeatherIcon(weatherTypes.cloudyDay)
                } else {
                    setCurrWeatherIcon(weatherTypes.cloudyNight)
                }
                break
            case 'Drizzle':
                setCurrWeatherIcon(weatherTypes.drizzle)
                break
            case 'Dust':
                setCurrWeatherIcon(weatherTypes.dust)
                break
            case 'Haze':
                setCurrWeatherIcon(weatherTypes.haze)
                break
            case 'Smoke':
                setCurrWeatherIcon(weatherTypes.smoke)
                break
            case 'Snow':
                setCurrWeatherIcon(weatherTypes.snow)
                break
            case 'Thunderstorm':
                setCurrWeatherIcon(weatherTypes.thunderstorms)
                break
            case 'Tornado':
                setCurrWeatherIcon(weatherTypes.tornado)
                break
            default:
                setCurrWeatherIcon(weatherTypes.cloudyDay)
                break
        }
    }, [type, sunsetTime])
    

    return (
        <div className='img-container'>
            <img src={currWeatherIcon} alt='partly sunny' />
        </div>  
    )
}
