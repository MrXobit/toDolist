import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/userSlice'
import bluePlus from '../../assets/blue-plus.png';
import { Link, useNavigate } from 'react-router-dom';
import './MainPage.css';
import axios from 'axios';
import Loader from '../utils/loader/Loader';

const MainPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [token, setToken] = useState(localStorage.getItem('token')); 
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)

  const getOllTasks = async() => {
    setLoading(true)
    try {
      const token = (localStorage.getItem('token'))
      console.log(token)
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTasks(response.data.tasks)
      console.log(response.data.tasks)
    } catch(e) {
      console.log(e)
    }finally {
      setLoading(false)
    }
  }
 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== token) {
      setToken(storedToken); 
    }
  }, []);


  const handleDelate = async(taskId) => {
    try {
      const token = (localStorage.getItem('token'))
      console.log(token)
       const response = await axios.delete(`http://localhost:5000/api/tasks/${taskId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
       })
       localStorage.setItem('token', response.data.token);
       setToken(response.data.token)
    } catch(e) {
      console.log(e)
    }
  }



  
  const handleEdit = (taskId) => {
    navigate(`/task/${taskId}`); // Потрібно додати слеш перед id
  };
  


  useEffect(() => {
    getOllTasks()
  }, [token])

  return (
    <div className='mainPage-con'>
     <h2 className="mainPage-title">Мій Список Завдань</h2>
      <Link to="/add-task" className="cafePass-add-new-cafe-pass-con">
    <div className="block-for-cafe-pass-img-pluss">
      <img src={bluePlus} alt="plus-icon" />
    </div>
    <p className="cafe-pass-p-just-text">Add New todo task</p>
  </Link>
  {loading ? (
    <div className="conFor-loader">
   <Loader/>
    </div>
  ) : (
    <div>
  <div>
  <div className="task-list-container">
    {tasks.length > 0 ? (
      tasks.map((task) => (
        <div key={task._id} className="task-card">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-description">{task.description}</p>
          <span className={`task-status ${task.status.replace(' ', '-')}`}>{task.status}</span>
          <div className="task-actions">
          <button onClick={() => handleEdit(task._id)} className="task-edit">Edit</button>
          <button onClick={() => handleDelate(task._id)} className="task-delete">Delete</button>
        </div>
        </div>
      ))
    ) : (
      <p className="no-tasks-message">Немає задач для відображення.</p>
    )}
  </div>
</div>

    <button className='handle-logout' onClick={() => dispatch(logout())}>
      logout
    </button>
  </div>
  )}
    </div>
  )
}

export default MainPage
