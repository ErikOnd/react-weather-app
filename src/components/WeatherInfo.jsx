import { Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { PlusLg } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Trash } from 'react-bootstrap-icons';



const WeatherInfo = ({ location }) => {


    const [weatherInfos, setWeatherInfo] = useState([])
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };


    const removeItem = (index) => {
        const newWeatherInfos = [...weatherInfos];
        newWeatherInfos.splice(index, 1);
        setWeatherInfo(newWeatherInfos);
    };




    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const getGeo = async (currentLoc = location) => {
        try {
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${currentLoc}&limit=5&appid=05833546db38c472f354ec08859e52c7`)
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
                setWeatherInfo(weatherInfos.concat(data))
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



    const addLocation = (location) => {
        getGeo(location)
    }



    return (
        <>
            {console.log('here', weatherInfos)}
            {weatherInfos[0] !== null && (

                <>

                    <Row className='justify-content-center align-items-center mt-5'>
                        {weatherInfos.map((weatherInfo) => {
                            return (

                                <Card style={{ width: '15rem' }} className="weather-card mt-5 mr-3">
                                    <h3 className='mt-4'>Today's weather for {weatherInfo.name}</h3>
                                    <Card.Img variant="top" className='weather-img' src={getImg(weatherInfo.clouds.all, kelvinToCelsius(weatherInfo.main.temp_max))} />
                                    <Card.Body>
                                        <Card.Text className='text-left'>
                                            <p><b>Weather:</b> {weatherInfo.weather[0].description}</p>
                                            <p><b>Temperature Max: </b>{kelvinToCelsius(weatherInfo.main.temp_max)}°C</p>
                                            <p><b>Temperature Min:</b> {kelvinToCelsius(weatherInfo.main.temp_min)}°C</p>
                                        </Card.Text>
                                        <Link to="/">
                                            <Button variant="danger" onClick={'test'} ><Trash size={30}></Trash></Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                        <PlusLg className='add-weather' onClick={handleShow}></PlusLg>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add a location</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Control
                                            type="text"
                                            placeholder="location"
                                            value={inputValue}
                                            onChange={handleChange}
                                            autoFocus
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => {
                                    handleClose();
                                    addLocation(inputValue);
                                }}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Row>
                </>
            )
            }
        </>

    )

}

export default WeatherInfo