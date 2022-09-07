import React from 'react'
import { BrowserRouter } from 'react-router-dom'; //Чтобы навигация по страницам была возможна - оборачиваем наше приложение
import './App.css';

function App() {
  return (
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;