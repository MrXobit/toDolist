import React, { useEffect, useState } from 'react';
import './TasksEdit.css'; 
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SubLoader from '../utils/subLoader/SubLoader';

const TasksEdit = () => {
    const {id} = useParams()
      const navigate = useNavigate()
      const [subLoading, setSubLoading] = useState(false)
      const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending' 
      });
      const [loading, setLoading] = useState(false)
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

     const getTask = async() => {
     setLoading(true)
       try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        console.log(response.data)
        setFormData({
            title: response.data.task.title,
            description: response.data.task.description,
            status: response.data.task.status
        })
       } catch(e) {
          console.log(e)
       }finally{
        setLoading(false)
       }
     }
 
     useEffect(() => {
         getTask()
     }, [])

     if(loading) {
        return <SubLoader/>
     }
    
     const handleSubmit = async (e) => {
        e.preventDefault();
      

        if (!formData.title || !formData.description || !formData.status) {
          alert("Будь ласка, заповніть всі поля!");
          return;
        }
        setSubLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.put(
            `http://localhost:5000/api/tasks/${id}`,
            {
              title: formData.title, 
              description: formData.description,
              status: formData.status,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
      
         navigate('/')
      
        } catch (e) {
          console.error("Error updating task:", e);
        } finally {
            setSubLoading(false);
        }
      };
      


  return (
    <div className="taskEdit-container">
    <h2 className="taskEdit-title">Оновити задачу</h2>
    <form onSubmit={handleSubmit} className="taskEdit-form">
      <div className="taskEdit-field">
        <label htmlFor="title" className="taskEdit-label">Назва:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="taskEdit-input"
          required
        />
      </div>

      <div className="taskEdit-field">
        <label htmlFor="description" className="taskEdit-label">Опис:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="taskEdit-textarea"
          required
        />
      </div>

      <div className="taskEdit-field">
        <label htmlFor="status" className="taskEdit-label">Статус:</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="taskEdit-select"
          required
        >
          <option value="pending">Очікує</option>
          <option value="in progress">В процесі</option>
          <option value="completed">Завершено</option>
        </select>
      </div>

      <button type="submit" disabled={SubLoader} className="taskEdit-btn">{subLoading ? 'loading' : 'Оновити задачу'}</button>
    </form>
  </div>
  )
}

export default TasksEdit
