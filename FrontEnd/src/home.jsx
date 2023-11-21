import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


export default function Home() {
    const [projects, setProjects] = useState([]);

    
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const res = await axios.get('http://localhost:8800/');
                setProjects(res.data); // You should use res.data to access the response data.
            } catch (error) {
                console.error(error); // Log the error properly.
            }
        };
        fetchAllProjects(); // Call the function to fetch data.
    }, []); // Add an empty dependency array to run the effect once on component mount.
    
    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/${id}`);
            setProjects((prevProjects) => prevProjects.filter(project => project.id !== id));
        } catch (error) {
            console.error(error);
        }
    }
    

    return (
        <>
          <div className='navbar'>
            <Link to='/category' className='addProject'>Project categories</Link>
          </div>
          <h1>Project List</h1>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>
                      {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not started'}
                    </td>
                    <td>
                      {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Not finished'}
                    </td>
                    <td className='btntd'>
                      <button onClick={() => handleDelete(project.id)} className='deletebtn'>Delete</button>
                      <button>
                        <Link to={`/update/${project.id}`}>Update</Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='pillar'></div>
          <Link to='/form' className='addProject'>Add a new project</Link>
        </>
      );
      
}

