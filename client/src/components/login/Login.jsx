import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { loginUser } from '../../store/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch()
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
    try{
      await dispatch(loginUser({ email: formData.email, password: formData.password }));
    } catch(e) {
      console.log(e)
    }
  };

  return (
    <div className='login-main-con'>
      <h2 className="login-title">Увійти</h2>

      <p className="for-all">
  Вітаємо! Щоб увійти як адміністратор, використовуйте наступні дані для входу:
  <br />
  <strong>Пошта:</strong> gnom@gmail.com
  <br />
  <strong>Пароль:</strong> 12345
  <br />
  Бажаємо вам приємного користування!
</p>


      <form className='form-login' onSubmit={handleSubmit}>
        <input 
          type="email" 
          name="email" 
          className='login-input' 
          placeholder='Електронна пошта' 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password" 
          className='login-input' 
          placeholder='Пароль' 
          value={formData.password} 
          onChange={handleChange} 
        />

  <Link className='signup-link' to="/sign-up">  <p>
  Немає акаунта? Зареєструватися
</p></Link>

        <button type="submit" className='login-btn'>Увійти</button>
      </form>
    </div>
  );
};

export default Login;