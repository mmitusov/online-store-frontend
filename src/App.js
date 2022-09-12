import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'; //Чтобы навигация по страницам была возможна - оборачиваем наше приложение
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;