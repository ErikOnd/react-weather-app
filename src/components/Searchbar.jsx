import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';


const Searchbar = (props) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <>
            <Row className='justify-content-center'><h1>React Weather App</h1></Row>
            <Form inline className="mt-5 d-flex justify-content-center">
                <FormControl
                    type="text"
                    placeholder="Search"
                    className="mr-sm-2 search-input"
                    size='lg'
                    value={inputValue}
                    onChange={handleChange}
                />
                <Link to="/home">
                    <Button variant="outline-primary" size='lg' onClick={() => {
                        props.newLocation(inputValue)
                    }}><Search></Search></Button>
                </Link>
            </Form>
        </>

    )

}

export default Searchbar