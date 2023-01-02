import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from '../loginpage/loginpage';
import MainPage from '../mainpage/mainpage';
import Room from '../../room/room';
import { importData } from '../../import_json/import_json';
import { useDispatch } from "react-redux";
import { loginUser } from '../../store/userSlice';
import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../../store/useAuth';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isAuth } = useAuth()

  const getDataFromLS = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
      const { userName, userImage, userId } = userData;
      dispatch(loginUser({ userName: userName, userImage: userImage, userId: userId }))
    }
  }

  useEffect(() => {
      // importData()
    getDataFromLS()
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/rooms/:id' element= {<Room/>}/>
      <Route path='/login' exact element={ !isAuth ? <LoginPage /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
