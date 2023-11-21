import axios from 'axios';
import React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

export default function Form (){
    const[form, setForm] = useState({
        name : '',
        description : '',
        start_date : '',
        end_date : '',
    })
    const [error, setError] = useState(false);
    const navigate = useNavigate()
    
    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value === '' ? null : value,
        }));
    }
    
    
    const handleClick = async (e) => {
        e.preventDefault();

        if (form.start_date === '') {
            form.start_date = null;
        }
        if (form.end_date === '') {
            form.end_date = null;
        }  
        try {
            await axios.post('http://localhost:8800/', form);
            navigate('/');
        } catch (error) {
            console.error('Error while making the POST request:', error);
            setError(true);
        }
        
        // Clear the form fields after a successful POST request
        setForm({
            name: '',
            description: '',
            start_date: '',
            end_date: '',
        });
    };
    
    
    return(
        <div className='formPage'>
            <h1>ADD A NEW PROJECT</h1>
            <form>
                <label htmlFor="name">
                    <input type='text' name='name' id='name'
                            onChange={handleChange} placeholder='Project name' />
                </label>
                <label htmlFor="description">
                    <textarea rows={5} type='text' name='description' id='description'
                            onChange={handleChange} placeholder='Project description' />
                </label>
                <label htmlFor="start_date">
                    <input type='date' name='start_date' id='start_date'
                            onChange={handleChange} placeholder='Start date' />
                </label>
                <label htmlFor="end_date">
                    <input type='date' name='end_date' id='end_date'
                            onChange={handleChange} placeholder='End date' />
                </label>
                <button onClick={handleClick}>Submit</button>
            </form>

            {error && 'Something went wrong'}

            <Link to='/'>GO BACK HOME</Link>
        </div>
    )
}