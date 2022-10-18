import { useMemo } from 'react'

// styles
import './WeatherWidget.scss'

// assets
import sunriseIcon from '../../assets/weather/sunrise.png'
import sunsetIcon from '../../assets/weather/sunset.png'
import windIcon from '../../assets/wind-icon.svg'
import humidityIcon from '../../assets/humidity-icon.svg'
import pressureIcon from '../../assets/pressure-icon.svg'

// components
import WeatherIcon from '../weather-icon/WeatherIcon'
import WeatherAttribute from '../weather-widget-attribute/WeatherAttribute'

export default function WeatherWidget({ weatherData }) {

    const convertUnixTime = (t) => {
        let suffix = 'AM'
        const date = new Date(t * 1000)
        let hours = date.getHours() + 4
        if (hours > 12 ) {
            hours -= 12
            suffix = 'PM'
        }
        const minutes = date.getMinutes()
        const formatttedTime = `${hours}:${minutes}${suffix}`
        return formatttedTime
    }

    const convertKelvin = (k) => {
        return Math.round((k - 273.15) * (9 / 5) + 32)
    }

    const convertPressure = (p) => {
        return (p / 33.863886666667).toFixed(2)
    }

    const {
        currTemp,
        cityName,
        description,
        sunRise,
        sunSet,
        lowTemp,
        highTemp,
        wind,
        humidity,
        pressure,
        } = useMemo(() => {
        const weatherMain = weatherData.main || {}
        const weather = weatherData || {}
        return {
            currTemp: convertKelvin(weatherMain.temp),
            cityName: weather.name,
            description: weather.weather[0].main,
            humidity: weatherMain.humidity,
            wind: weather.wind.speed.toFixed(1),
            pressure: convertPressure(weatherMain.pressure),
            highTemp: convertKelvin(weatherMain.temp_max),
            lowTemp: convertKelvin(weatherMain.temp_min),
            sunRise: weather.sys.sunrise + weather.timezone,
            sunSet: weather.sys.sunset + weather.timezone
        }
    }, [weatherData])

    const highLowScale = () => {
        const range = highTemp - lowTemp
        return ((currTemp - lowTemp) / range) * 100
    }

    const attributes = [
        {
            title: 'Wind',
            img: windIcon,
            data: wind,
            metric: 'MPH'
        },
        {
            title: 'Humidity',
            img: humidityIcon,
            data: humidity,
            metric: '%'
        },
        {
            title: 'Pressure',
            img: pressureIcon,
            data: pressure,
            metric: 'inHg'
        }
    ]

    if (!weatherData) return null
        
    return (
        <div className='widget-container'>
            <WeatherIcon type={description} sunsetTime={sunSet}/>
            <div className='daylight-scale'>
                <div className='daylight-text'>
                    <div className='text-container'>
                        <img src={sunriseIcon} alt='sunrise icon' />
                        <h4>{convertUnixTime(sunRise)}</h4>
                    </div>
                    <div className='text-container'>
                        <img src={sunsetIcon} alt='sunrise icon' />
                        <h4>{convertUnixTime(sunSet)}</h4>
                    </div>
                </div>        
            </div>
            <div className='center-info'>
                <h1>{currTemp}&#176;</h1>
                <h2>{cityName}</h2>
                <h4>{description}</h4>
            </div>
            <div className='high-low-temp'>
                <h3>{lowTemp}&#176;</h3>
                <div className='high-low-bar'>
                    <div className='circle' style={{ left: `${highLowScale()}%`}}></div>
                </div>
                <h3>{highTemp}&#176;</h3>
            </div>
            <div className='weather-attributes-container'>
                {attributes.map((attribute) => (
                    <WeatherAttribute key={attribute.title} attribute={attribute}/>
                ))}
            </div>
        </div>
    )
}