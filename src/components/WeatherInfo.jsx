import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';



const WeatherInfo = ({ location }) => {


    const [weatherInfo, setWeatherInfo] = useState(null)


    const getGeo = async () => {
        try {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=05833546db38c472f354ec08859e52c7`)
            const data = await res.json()
            if (res.ok) {

                const lat = data[0].lat
                const lon = data[0].lon
                getWeatherInfo(lat, lon)
            }

        } catch (error) {
            console.log(error)

        }
    }

    const getWeatherInfo = async (lat, lon) => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=05833546db38c472f354ec08859e52c7`)
            const data = await res.json()

            if (res.ok) {
                setWeatherInfo(data)
            }

        } catch (error) {
            console.log(error)

        }
    }



    const kelvinToCelsius = (kelvin) => {
        return Math.round(kelvin - 273.15);
    }

    const getImg = (cloudiness, maxTemp) => {

        if (cloudiness < 10) {
            return 'https://cdn-icons-png.flaticon.com/512/869/869869.png'
        }

        if (cloudiness < 60) {
            return 'https://cdn-icons-png.flaticon.com/512/9586/9586736.png'
        }

        if (cloudiness < 90) {
            return 'https://cdn-icons-png.flaticon.com/512/473/473697.png '
        }

        if (cloudiness > 90 && maxTemp <= 0) {
            return 'https://cdn-icons-png.flaticon.com/512/7334/7334205.png '
        }

        if (cloudiness > 90) {
            return 'https://cdn-icons-png.flaticon.com/512/7038/7038436.png'
        }

    }



    useEffect(() => {
        getGeo()
    }, [])



    return (
        <>
            {console.log('here', weatherInfo)}
            {weatherInfo !== null && (

                <>
                    <h1 className='mb-5'>Today's weather for {location}</h1>
                    <Row className='justify-content-center'>
                        <Card style={{ width: '30rem' }} className="weather-card">
                            <Card.Img variant="top" className='weather-img' src={getImg(weatherInfo.clouds.all, kelvinToCelsius(weatherInfo.main.temp_max))} />
                            <Card.Body>
                                <Card.Text className='text-left'>
                                    <p>Weather: {weatherInfo.weather[0].description}</p>
                                    <p>Temperature Max: {kelvinToCelsius(weatherInfo.main.temp_max)}°C</p>
                                    <p>Temperature Min: {kelvinToCelsius(weatherInfo.main.temp_min)}°C</p>
                                </Card.Text>
                                <Link to="/">
                                    <Button variant="primary">Change Location</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Row>

                </>


            )




            }


        </>

    )

}

export default WeatherInfo