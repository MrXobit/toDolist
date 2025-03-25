import React, { useState } from 'react';
import './AddTask.css'; // Добавим файл стилей
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTask = () => {
  const navigate = useNavigate()
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.status) {
        alert("Будь ласка, заповніть всі поля!");
        return; 
      }
      setLoading(true)
      try {
        const token = (localStorage.getItem('token'))
        console.log(token)
        const response = await axios.post('http://localhost:5000/api/tasks', {
            title: formData.title,
            description : formData.description,
            status: formData.status
        },{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
        localStorage.setItem('token', response.data.token);
        navigate('/')
      } catch(e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
  };

  return (
    <div className='addTask-container'>
      <h2 className='addTask-title'>Додати задачу</h2>
      <form onSubmit={handleSubmit} className='addTask-form'>
        <div className='addTask-field'>
          <label htmlFor="title" className='addTask-label'>Назва:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className='addTask-input'
            required
          />
        </div>
        
        <div className='addTask-field'>
          <label htmlFor="description" className='addTask-label'>Опис:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className='addTask-textarea'
            required
          />
        </div>

        <div className='addTask-field'>
          <label htmlFor="status" className='addTask-label'>Статус:</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className='addTask-select'
            required
          >
            <option value="pending">Очікує</option>
            <option value="in progress">В процесі</option>
            <option value="completed">Завершено</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className='addTask-btn'>{loading ? 'loading' : "Додати задачу"}</button>
      </form>
    </div>
  );
};

export default AddTask;
