//AppRouter проверяет, зарегестрирован ли наш юзер

import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'; //Чтобы навигация по страницам была возможна - оборачиваем наше приложение
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;