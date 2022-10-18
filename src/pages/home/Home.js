import axios from 'axios'
import { useEffect, useState } from 'react'
import { OPEN_WEATHER_API_KEY } from '../../API_KEYS'

// styles
import './Home.scss'

// assets
import BG from '../../assets/BG.jpeg'

// components
import WeatherWidget from '../../components/weather-widget/WeatherWidget'

export default function Home() {
    const [searchError, setSearchError] = useState(null)
    const [userInput, setuserInput] = useState()
    const [currCity, setCurrCity] = useState('seattle')
    const [weatherData, setWeatherData] = useState(null)
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${OPEN_WEATHER_API_KEY}`

    const [parentWidth, setParentWidth] = useState(null)
    const [childWidth, setChildWidth] = useState(null)
    const [proportion, setProportion] = useState(0.47)

    useEffect(() => {
        setSearchError(null)
        axios
        .get(openWeatherURL)
        .then(
            (response) => {
                setWeatherData(response.data)
                console.log(response.data)
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

    useEffect(() => {
        const cw = document.getElementById('childElement').offsetWidth
        const pw = document.getElementById('parentElement').offsetWidth
        console.log(`child width: ${cw}`)
        console.log(`parent width: ${pw}`)
        setProportion(pw / 1000)
        setChildWidth(pw * (pw / 655))
        setParentWidth(pw)
    }, [childWidth, parentWidth, weatherData, proportion])

    return (
        <div className='home-container'>
            <div id="parentElement" className='component-container'>
                <img src={BG} alt='home kitchen dining area' />
                <div 
                    id="childElement"
                    className='component'
                    style={{
                        top: '0',
                        transform: `scale(${proportion}) translate(${90 * proportion}%, ${24 * proportion}%)`
                    }}>
                    {weatherData && <WeatherWidget weatherData={weatherData}/>}
                </div> 
            </div>

            <div className='input-container'>
                <div>       
                    <input
                        className='user-input'
                        type='text'
                        onChange={(e) => setuserInput(e.target.value)}
                        placeholder='Enter a city'
                    />
                </div>
                <button
                    onClick={handleClick}
                >Go</button>
                <div>
                    {searchError && <p>{searchError}</p>}
                </div>
                
            </div>
        </div>
    )
}
