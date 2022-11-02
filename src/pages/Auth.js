import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import {Context} from '../index'
import { useState } from 'react'
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'

const Auth = observer(() => {
  const {user} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  const click = async () => {
    try {
        let response;
        if (isLogin) {
          response = await login(email, password)     
        } else {
          response = await registration(email, password)      
        }
        user.setUser(response) 
        user.setIsAuth(true)
        navigate(SHOP_ROUTE)       
    } catch(e) {
        alert(e.response.data.message)
    }    
  }

  return (
    <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
    >
      {isLogin ?
        <Card style={{width: 600}} className="p-5">
          <h2 className='m-auto'>Авторизация</h2>
          <Form className='d-flex flex-column'>
            <Form.Control 
              className='mt-2'
              placeholder="Введите ваш email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control
              className='mt-3'
              placeholder="Введите ваш пароль"
              type='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className='d-flex justify-content-between mt-3'>
              <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйся!</NavLink></div>
              <Button 
                variant='outline-success'
                onClick={click}
              >
                Войти
              </Button>
            </div>
          </Form>
        </Card>
      :
        <Card style={{width: 600}} className="p-5">
        <h2 className='m-auto'>Регистрация</h2>
        <Form className='d-flex flex-column'>
        <Form.Control 
            className='mt-2'
            placeholder="Введите ваш email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            className='mt-3'
            placeholder="Введите ваш пароль"
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='d-flex justify-content-between mt-3'>
            <div>Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Заходи!</NavLink></div>
            <Button 
              variant='outline-success'
              onClick={click}
            >
              Зарегестрироваться
            </Button>
          </div>
        </Form>
      </Card>
    }
    </Container>    
  )
})

export default Auth