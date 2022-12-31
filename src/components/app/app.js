import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LoginPage from '../loginpage/loginpage';
import MainPage from '../mainpage/mainpage';
import { accountsRef, roomsRef } from '../../firebase/firebaseConnection';
import { importData } from '../../import_json/import_json';
import { useDispatch } from "react-redux";
import { loginUser } from '../../store/userSlice';
import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  const getDataFromLS = () => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    if (userData) {
      const { userName, userImage, userId } = userData;
      dispatch(loginUser({ userName: userName, userImage: userImage, userId: userId }))
    }
    else return <Navigate replace to="/login" />
  }

  useEffect(() => {
    // importData()
    const unSub = onSnapshot(roomsRef, (snapshot) => {
      //   console.log(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    getDataFromLS()
    return unSub;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='login' element={<LoginPage />} />
    </Routes>
  );
}

export default App;
