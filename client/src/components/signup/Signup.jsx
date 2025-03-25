import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../../store/userSlice';
import './Signup.css';
import { Link } from 'react-router-dom';
const Signup = () => {
    const dispatch = useDispatch();
      const [formData, setFormData] = useState({
        email: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await dispatch(signup({ email: formData.email, password: formData.password }));
        } catch(e) {
            console.log(e)
        }
      };

    
  return (
<div className='signup-main-con'>
  <h2 className="signup-title">Зареєструватись</h2>


  <p className="for-all">
  Вітаємо! Щоб увійти як адміністратор, використовуйте наступні дані для входу:
  <br />
  <strong>Пошта:</strong> gnom@gmail.com
  <br />
  <strong>Пароль:</strong> 12345
  <br />
  Бажаємо вам приємного користування!
</p>



  <form className='signup-form' onSubmit={handleSubmit}>
    <input 
      type="email" 
      name="email" 
      className='signup-input' 
      placeholder='Електронна пошта' 
      value={formData.email} 
      onChange={handleChange} 
    />
    <input 
      type="password" 
      name="password" 
      className='signup-input' 
      placeholder='Пароль' 
      value={formData.password} 
      onChange={handleChange} 
    />

<Link className='signup-link' to="/login">
  <p>
    Є акаунт? Увійти
  </p>
</Link>

    <button type="submit" className='signup-btn'>Зареєструватись</button>
  </form>
</div>

  )
}

export default Signup
