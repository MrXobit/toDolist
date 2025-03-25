import React, { useEffect } from 'react'
import './App.css';
import Signup from './components/signup/Signup';
import Router from './components/Router';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './store/userSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch]);

  return (
    <div>
      <Router/>
    </div>
  )
}

export default App
