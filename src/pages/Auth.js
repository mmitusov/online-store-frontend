//В начале создания, сразу все оборачиваем в контейнер и делаем его flex. И "justify-content-center align-items-center" - чтобы отцентровать все как по горизонтали так и по вертикали
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//Здесь же, инлайн стилем зададим и высоту контейнера. Высоту мы будем получать от высоты всего браузера, минус высота навбара
//Теперь сделаем саму форму. Внутри создадим бутстраповский компонет Form. И саму Form поместим дополнительно в Card (проста карточка которая обрамлена рамкой), после чего задаим ей стиль
//Над формой разместим ее название в <h2> и выровняем по центру. Саму форму сделаем flex, а по направлению контейнера - column
//Внутри формы добавим 2 инпута и к ним сдразу сделаем placeholder (для логина и пароля). И сделаем так чтобы логин не прилипал к <h2> (при помощи 'mt-2')
//Под инпутами добавим кнопку "Войти". И при помощи bootstrap класа отлепим ее от поля инпута и отцентруем ее по правой части
//А слева от кнопки Войти, добавим предложение зарегестрироваться, со ссылкой на форму регестрации
//Для этого завернем эту ссылку и кнопку Войти в одну новую строку (компонет Row), для того чтобы мы потом могли их расположить друг относительно друга, в рамках отдельного Row, а не всего контейнера. 
//При создании ссылки, перед кнопкой Войти добавим простой div, куда и поместим предложение о регестрации с последующей ссылкой на данную страницу
//Чтобы расположить елементы в Row по разные стороны контейнера, то воспользуемся "d-flex justify-content-between". И теперь стили расположения кнопки Войти можно убрать
//!!!P.S. Почему-то в новой версии bootstrap, при использовании Row у нас ничего не выравнивается. Но когда я заменил бутстраповский Row на обычный <div> - все заработало и выравнялось
//!!!По новой документации Row работает нормально только с елементами завернутыми в Col. Поэтому и не сработал в Auth.js

//Завершив форму логина, теперь мы должны дополнительно добавить форму регистрации (в этом же файле). Чтобы в зависимости от указанной в браузере ссылки (маршрута), у нас отображался либо логин, либо регистрация
//Для этого воспользуемся хуком "useLocation" из 'react-router-dom'. С помощью него можно получить маршрут в строке запроса (маршрут хранится в ключе pathname)
//И теперь когда маршрут из браузера будет совпадать с LOGIN_ROUT (true), мы будем отрисовывать часть кода с логином, а если нет, то с регистрацией
//Чтобы не дублировать код, логику "или" можно было бы прописать только в тех частях где меняется текст/ссылки. Но для для лишей наглядности, я разделил полностью продублировал и разделил две логики
import React from 'react' //rafce snippet
import { Button, Card, Container, Form } from 'react-bootstrap'
import { NavLink, useLocation } from 'react-router-dom'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'

const Auth = () => {
  const location = useLocation()
  const isLogin = location.pathname === LOGIN_ROUTE

  return (
    <Container 
      className='d-flex justify-content-center align-items-center'
      style={{height: window.innerHeight - 54}}
    >
      {isLogin ?
        <Card style={{width: 600}} className="p-5">
          <h2 className='m-auto'>Авторизация</h2>
          <Form className='d-flex flex-column'>
            <Form.Control placeholder="Введите ваш email" className='mt-2'/>
            <Form.Control placeholder="Введите ваш пароль" className='mt-3'/>
            <div className='d-flex justify-content-between mt-3'>
              <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегестрируйся!</NavLink></div>
              <Button variant='outline-success'>Войти</Button>
            </div>
          </Form>
        </Card>
      :
        <Card style={{width: 600}} className="p-5">
        <h2 className='m-auto'>Регистрация</h2>
        <Form className='d-flex flex-column'>
          <Form.Control placeholder="Введите ваш email" className='mt-2'/>
          <Form.Control placeholder="Введите ваш пароль" className='mt-3'/>
          <div className='d-flex justify-content-between mt-3'>
            <div>Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Заходи!</NavLink></div>
            <Button variant='outline-success'>Зарегестрироваться</Button>
          </div>
        </Form>
      </Card>
    }
    </Container>    
  )
}

export default Auth