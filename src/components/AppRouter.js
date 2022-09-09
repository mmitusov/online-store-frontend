import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes } from '../routes';

const AppRouter = () => {
  const isAuth = false //временная заглушка - показывает авторизован пользователь или нет
  //импортируем массив с роутами доступный авторизованным, пробегаемся по нему с помощью .map() и вытаскиваем из объекта путь и компонент
  //И для каждого елемента массива мы отрисовываем Route, где указываем путь и компонент который по этому пути должен отрисовывать
  return (
    <Switch>
      {authRoutes.map(({path, Component}) => 
        <Route path={path} component={Component}/>
      )}
    </Switch>
  )
}

export default AppRouter