import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
//Импортируем массив с роутами доступный авторизованным юзерам (authRoutes), пробегаемся по нему с помощью .map() и вытаскиваем из объекта путь и компонент
//И для каждого елемента массива мы отрисовываем Route, где указываем путь и компонент который по этому пути должен отрисовывать
//И поскольку мы пробегаемся по массиву - не забываем указывать ключ (object key:value pair). Ключом будет путь, так как каждый путь уникальный
//Также не забываем добавить "isAuth===true" иначе эти маршруты будут доступны каждому пользователю. В публичных указывать не обательно, так как здесь все будет общедоступно
//Переход по страницам: в 'react-router-dom' мы передаем созданный нами адресс "/___" и говорим на какую страницу нас переключать попав на этот адресс
//Если страницы не были надены, то самым последним у нас срабатывает "Navigate to={}"
//Долгое время Navigate не работал, так как я не смог запустить редирект старым синтаксисом. Но новый синтаксис ниже успешно заработал
//path="*" - означает следующею логику: если указаный url не существует (invalid), запускаем елемент что перенаправляет нас на SHOP_ROUTE
//---Не понял зачем мы используем key???
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
      <Route path="*" element={<Navigate to={SHOP_ROUTE} />} /> 
    </Routes>
  )
}

export default AppRouter