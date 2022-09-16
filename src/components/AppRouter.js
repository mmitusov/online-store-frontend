import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
//Импортируем массив с роутами доступный авторизованным юзерам (authRoutes), пробегаемся по нему с помощью .map() и вытаскиваем из объекта путь и компонент
//И для каждого елемента массива мы отрисовываем Route, где указываем путь и компонент который по этому пути должен отрисовывать
//И поскольку мы пробегаемся по массиву - не забываем указывать ключ (object key:value pair). Ключом будет путь, так как каждый путь уникальный
//Также не забываем добавить "isAuth===true" иначе эти маршруты будут доступны каждому пользователю. В публичных указывать не обательно, так как здесь все будет общедоступно
//Переход по страницам: в 'react-router-dom' мы передаем созданный нами адресс "/" и говорим на какую страницу нас переключать попав на этот адресс
//
//---Не понял зачем мы используем key???
//---Navigate для редиректа с  неправильного url НЕ РАБОТАЕТ!
//---Нужно расписать плюсы использования 'react-router-dom';

const AppRouter = () => {
  const isAuth = false //временная заглушка - показывает авторизован пользователь или нет

  return (
    <Routes>
      {isAuth===true && authRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>}/>
      )}
      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>}/>
      )}
      <Route path="/wrong_url" element={ <Navigate to={SHOP_ROUTE} /> } />      
    </Routes>
  )
}

export default AppRouter