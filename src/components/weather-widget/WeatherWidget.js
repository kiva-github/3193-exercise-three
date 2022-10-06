import { useMemo } from 'react'

// styles
import './WeatherWidget.scss'

// assets
import partlySunny from '../../assets/weather/partly-sunny.png'
import windIcon from '../../assets/wind-icon.svg'
import humidityIcon from '../../assets/humidity-icon.svg'
import pressureIcon from '../../assets/pressure-icon.svg'

// components
import WeatherAttribute from '../weather-widget-attribute/WeatherAttribute'

export default function WeatherWidget({ weatherData }) {

    const convertKelvin = (k) => {
        return Math.round((k - 273.15) * (9 / 5) + 32)
    }

    const convertPressure = (p) => {
        return (p / 33.863886666667).toFixed(2)
    }

    const highLowScale = () => {
        const range = highTemp - lowTemp
        return ((currTemp - lowTemp) / range) * 100
    }

    const { currTemp, cityName, description, humidity, wind, pressure, highTemp, lowTemp } = useMemo(() => {
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
            lowTemp: convertKelvin(weatherMain.temp_min)
        }
    }, [weatherData])

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
            <div className='img-container'>
                <img src={partlySunny} alt='partly sunny' />
            </div>
            <div className='center-info'>
                <h1>{currTemp}</h1>
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
