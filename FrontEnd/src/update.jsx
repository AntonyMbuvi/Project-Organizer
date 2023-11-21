import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';

export default function Update (){
    const [project, setProject] = useState([]);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const projectId = location.pathname.split('/')[2]

    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/${projectId}`);
                setProject(res.data[0]); // You should use res.data to access the response data.
            } catch (error) {
                console.error(error); // Log the error properly.
            }
        };
        fetchProject(); // Call the function to fetch data.
    }, []); 
    const[form, setForm] = useState({
        name : '',
        description : '',
        start_date : '',
        end_date : '',
    })
    
    function handleChange(e){
        setForm((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleClick = async(e) => {
        e.preventDefault();
        try {
            console.log('form in handle click', form)
            await axios.put(`http://localhost:8800/${projectId}`, form);
            navigate('/');
        } catch (error) {
            console.error('Error while making the PUT request:', error);
            setError(true);
        }
    }
    
    return(
        <div className='updatePage'>
            <h1>UPDATE PROJECT</h1>
            
            <form>
                <label htmlFor="name">
                    <input type='text' name='name' id='name' 
                            onChange={handleChange} placeholder={project.name} />
                </label>
                <label htmlFor="description">
                    <textarea rows={5} type='text' name='description' id='description'
                            onChange={handleChange} placeholder={project.description} />
                </label>
                <label htmlFor="start_date">
                    <input type='date' name='start_date' id='start_date'
                            onChange={handleChange} 
                            placeholder={project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not started'} />
        

                </label>
                <label htmlFor="end_date">
                    <input type='date' name='end_date' id='end_date'
                            onChange={handleChange} 
                            placeholder={project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Not started'} />
                </label>
                <button onClick={handleClick}>Submit</button>
            </form>

            {error && 'Something went wrong'}

            <Link to='/'>GO BACK HOME</Link>
        </div>
    )
}