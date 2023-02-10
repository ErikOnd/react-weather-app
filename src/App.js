import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import Searchbar from './components/Searchbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherInfo from './components/WeatherInfo';
import { useState } from 'react';

function App() {

  const [location, setLocation] = useState('')
  const [weather, setWeather] = useState(null)

  const changeLocation = (clickedBook) => {
    setLocation(clickedBook)
  }



  return (
    <div className="App">
      <Container className='mt-5 px-5'>
        <BrowserRouter>
          <Routes>
            <Route element={<Searchbar newLocation={changeLocation} />} path="/" />
            <Route element={<WeatherInfo location={location} />} path="/home" />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
