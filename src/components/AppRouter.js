import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import { authRoutes } from '../routes';

const AppRouter = () => {
  const isAuth = false //временная заглушка - показывает авторизован пользователь или нет
  return (
    <Switch>
      {authRoutes}
    </Switch>
  )
}

export default AppRouter