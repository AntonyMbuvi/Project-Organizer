import axios from 'axios';
import React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Category() {
    const [projects, setProjects] = useState([]);
  
    useEffect(() => {
      const fetchAllProjects = async () => {
        try {
          const res = await axios.get('http://localhost:8800/');
          setProjects(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchAllProjects();
    }, []);
  
    const completedProjects = projects.filter((project) => project.end_date);
    const ongoingProjects = projects.filter((project) => !project.end_date && project.start_date);
    const futureProjects = projects.filter((project) => !project.start_date);
  
    return (
      <>
        <div className='navbar'> 
            <Link to='/'>GO BACK HOME</Link>
        </div>
        {completedProjects.length > 0 && <h1>Completed Projects</h1>}
        {completedProjects.length > 0 && (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            </thead>
            <tbody>
            {completedProjects.map((project) => (
                <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not started'}</td>
                <td>{project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Not finished'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
        
        {ongoingProjects.length > 0 && <h1>Ongoing Projects</h1>}
        {ongoingProjects.length > 0 && (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            </thead>
            <tbody>
            {ongoingProjects.map((project) => (
                <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not started'}</td>
                <td>{project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Not finished'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}
  

        {futureProjects.length > 0 && <h1>Future Projects</h1>}
        {futureProjects.length > 0 && (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
            </tr>
            </thead>
            <tbody>
            {futureProjects.map((project) => (
                <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'Not started'}</td>
                <td>{project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Not finished'}</td>
                </tr>
            ))}
            </tbody>
        </table>
        )}

        
        
  
        <Link to='/form' className='addProject'>
          Add a new project
        </Link>
      </>
    );
  }
  