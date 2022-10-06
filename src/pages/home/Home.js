import axios from 'axios'
import { useEffect, useState } from 'react'
import { OPEN_WEATHER_API_KEY } from '../../API_KEYS'

// styles
import './Home.scss'

// assets
import BG from '../../assets/BG.png'

// components
import WeatherWidget from '../../components/weather-widget/WeatherWidget'

export default function Home() {
    const [searchError, setSearchError] = useState(null)
    const [userInput, setuserInput] = useState()
    const [currCity, setCurrCity] = useState('seattle')
    const [weatherData, setWeatherData] = useState(null)

    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${OPEN_WEATHER_API_KEY}`

    useEffect(() => {
        setSearchError(null)
        axios
        .get(openWeatherURL)
        .then(
            (response) => {
                setWeatherData(response.data)
            }
        ).catch(
            (error) => {
                setWeatherData(null)
                setSearchError('Unable to find that city')
                console.log(error.message)
            }
        )
    }, [currCity, openWeatherURL])

    const handleClick = () => {
        setCurrCity(userInput)
    }

    return (
        <div className='home-container'>
            <div
                className='component-container'
                style={
                    {
                        backgroundImage: `url(${BG})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'
                    }
                }
            >
                {weatherData && <WeatherWidget weatherData={weatherData}/>}
            </div>

            <div className='input-container'>
                <div>       
                    <input
                        className='user-input'
                        type='text'
                        onChange={(e) => setuserInput(e.target.value)}
                        placeholder='Enter a city'
                    />
                    <button
                        onClick={handleClick}
                    >Go</button>
                </div>
                <div>
                    {searchError && <p>{searchError}</p>}
                </div>
                
            </div>
        </div>
    )
}
