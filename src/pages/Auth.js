//В начале создания, сразу все оборачиваем в контейнер и делаем его flex. И "justify-content-center align-items-center" - чтобы отцентровать все как по горизонтали так и по вертикали
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//Здесь же, инлайн стилем зададим и высоту контейнера. Высоту мы будем получать от высоты всего браузера, минус высота навбара
//Теперь сделаем саму форму. Внутри создадим бутстраповский компонет Form. И саму Form поместим дополнительно в Card (проста карточка которая обрамлена рамкой), после чего задаим ей стиль
//Над формой разместим ее название в <h2> и выровняем по центру. Саму форму сделаем flex, а по направлению контейнера - column
//Внутри формы добавим 2 инпута и к ним сдразу сделаем placeholder (для логина и пароля). И сделаем так чтобы логин не прилипал к <h2> (при помощи 'mt-2')
//Единственно, для инпута под пароль сделаем тип "type='password'", чтобы пароль у нас открыто не отображался при вводе
//Под инпутами добавим кнопку "Войти". И при помощи bootstrap класа отлепим ее от поля инпута и отцентруем ее по правой части
//А слева от кнопки Войти, добавим предложение зарегестрироваться, со ссылкой на форму регестрации
//Для этого завернем эту ссылку и кнопку Войти в одну новую строку (компонет Row), для того чтобы мы потом могли их расположить друг относительно друга, в рамках отдельного Row, а не всего контейнера. 
//При создании ссылки, перед кнопкой Войти добавим простой div, куда и поместим предложение о регестрации с последующей ссылкой на данную страницу
//Чтобы расположить елементы в Row по разные стороны контейнера, то воспользуемся "d-flex justify-content-between". И теперь стили расположения кнопки Войти можно убрать
//!!!P.S. Почему-то в новой версии bootstrap, при использовании Row у нас ничего не выравнивается.
//В новой версии bootstrap, для достежения нужного еффекта нужно использовать Form вместо Row
//!!!По новой документации Row работает нормально только с елементами завернутыми в Col. Поэтому и не сработал в Auth.js
//!!!Получал ошибку: validateDOMNesting(...): <form> cannot appear as a descendant of <form>. - так как "Уже есть аккаунт?" завернул в тег <Form>, а размещать Form внутри другой Form нельзя. Поменял на div и ошибка пропала

//Завершив форму логина, теперь мы должны дополнительно добавить форму регистрации (в этом же файле). Чтобы в зависимости от указанной в браузере ссылки (маршрута), у нас отображался либо логин, либо регистрация
//Для этого воспользуемся хуком "useLocation" из 'react-router-dom'. С помощью него можно получить маршрут в строке запроса (маршрут хранится в ключе pathname)
//И теперь когда маршрут из браузера будет совпадать с LOGIN_ROUT (true), мы будем отрисовывать часть кода с логином, а если нет, то с формой регистрации
//Чтобы не дублировать код, логику "или" можно было бы прописать только в тех частях где меняется текст/ссылки. Но для для лишей наглядности, я разделил полностью продублировал и разделил две логики

//Далее, после того как мы реализовали часть логики по авторизации (в папке http), при подвязке фронта к беку, проверим ее работоспособность
//Для этого создадим уневерсальную асинхроную функцию и под авторизацию и под регистрацию - click() 
//И внутри нее сделаем проверку: если пользователь - "isLogin" (ранее уже регестрировался), то делаем запрос на авторизацию
//А если пользователь - не "isLogin" (еще не регестрировался и его данных нет в БД), то делаем запрос на регистрацию
//В переменную response (внутри click()) поместим ранее созданую функцию login/registration() из '../http/userAPI'
//И для того чтобы оживить инпуты логин/пароль и сохраниять/использовать данные из них, создадим состояния которые будут их хранить: [email, setEmail], [password, setPassword]
//И подвяжем наши состояния в код: внутри <Form.Control> сперва добавим value={email} - выцепляет значения из инпута, а после добавим onChange={e => setPassword(e.target.value)}
//onChange={e => setPassword(e.target.value)} - то есть, когда мы вводим что-то в инпут (фиксируем изменения в <Form.Control>), то мы стразу перезаписываем наше состояние новым значением из инпута
//Теперь значения email и password из наших состояний передаем в функцию registration()
//И не забываем повесить на кнопки "Войти/Зарегестрироваться" слушатель события onClick={click}, чтобы передать наше текущее состояние в функцию click() 
//И пока, для провери работы, просто выведим в логи то что находиться в нашем response от сервера, после отправки туда данных о пользователе (console.log(response))
//P.S. Должен вернуться ответ, в котором одно из полей будет JWT токеном
//Теперь userAPI.js установим пакет 'jwt-decode', и при помощи него будем декодировать токен, и в Auth.js возвращать уже объект с информацией о пользователе
//Убедившись, что все работает - обернем весь наш компонет в observer('mobx-react-lite'), чтобы елемент, в зависимости от действий юзера, перерендривался в режиме реального времени (чтобы mobx мог отслеживать изменения значений состояний и при их изменении автоматически обновлять контент страницы)
//Закончим логику функции click() - создадим и вынесем наверх функции одну переменую response, вместо того чтобы создавать две отдельные (под регестрацию и логин)
//Далее нам уже понадобится хранилище userStore.js (импортируем его). Напоминаю, имя {user} - это то имя что мы создали в корневом index.js
//Так как userStore.js должент хранить в себе инфо о пользователе, то добавим туда новую инфо 'user.setUser(response)' и 'user.setIsAuth(true)' - в зависимости от статуса пользователя, некоторый функционал может быть закрытым, такой как страница Админа
//Теперь, когда в userStore.js, "this._isAuth" может меняться динамически, то поменяем ранее заданое true в userStore.js (для тестинга работоспособности), на изначальное false

//Но что если пользователь ввел невреные данные логина? Мы должны как-то обрабатывать эти ошибки, чтобы сказать об этом юзеру. 
//Для этого обернем click() в 'try-catch' блок, и в случае ошибки выведем alert(e.response.data.message)

//Также, после того как пользователь залогинился, нам нужно отправлять его на страницу магазина, для это воспользуемся useNavigate ('react-router-dom')
//И если функция click() выполнилась успешно, то в ее конце делаем редирект на страницу магазина 'navigate(SHOP_ROUTE)'
//И на этом моменте мы наконец можем логинится/регестрироваться, но наш токен нигде не сохраняется. И поэтому в userAPI.js, пропишем логику для его сохранения в localStorage

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
          console.log(response)
        } else {
          response = await registration(email, password)
          console.log(response)     
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