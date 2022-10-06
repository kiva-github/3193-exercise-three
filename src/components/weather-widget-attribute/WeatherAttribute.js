// styles
import './WeatherAttribute.scss'

export default function WeatherAttribute({ attribute }) {
  const { title, img, data, metric } = attribute
  return (
    <div className='weather-attribute-container'>
        <div className='title-container'>
            <h4>{title}</h4>
            <img src={img} alt='wind icon' />
        </div>
        <div className='attribute-data'>
            <h3>{data}</h3>
            <h4>{metric}</h4>
        </div>
    </div>
  )
}
