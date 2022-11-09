//Вначале сразу получаем глабальное хранилище UserStore (mobx) из Context. Еедь в зависимости от того авторизован пользователь или нет - наш NavBаr будет меняться
//Далее копируем с сайта bootstrap react нужный нам навбар и импортируем необходимые для его работы модули. Нужные модули указаны на сайте
//После чего експортируем NavBаr и импортируем его в App.js, чтобы он отображался у нас на каждой странице
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//То есть, так как в App.js отображаются все видимые нам компоненты, то сверху мы помещаем NavBar (виден всегда), а под ним AppRouter который будет уже отображать под NavBar тот компонет который будет указан в AppRouter
//Далее поменяем NavLink из bootstrap на NavLink из react-router-dom, чтобы мы могли переключаться по нашим pages (пользоваться нашим react-router-dom)
//Далее быстренько настроим новый navbar - убераем лишнее, добавляем нужное, меняем стили.
//Была проблема с ml-auto, но оказалось, что просто в новой версии изменили синтаксис. Новый синтаксис - https://getbootstrap.com/docs/5.1/utilities/spacing/
//P.S. Чтобы не тратить время на создание файлов со стилями, некоторые стили будем прописывать inline прям в HTML елементах (style={___})
//Далее воспользуемся тернарным оператором (if логика) и в зависимость от того авторизован пользователь или нет - будем отображать тот или иной div
//P.S. При логике if мы можем отображать только один div за раз, но не сразу несколько. Поэтому заварачиваем все интересующие нас елементы под один div
//Далее, чтобы елемент, в зависимости от действий юзера, перерендривался в режиме реального времени (чтобы mobx мог отслеживать изменения значений состояний и при их изменении автоматически обновлять контент страницы) - обернем наш компонент в функцию observer()
//И убедимся что все работает при помощи слушателя "onClick={() => user.setIsAuth(true)}" на кнопке аторизации. При нажатии - становимся авторизованими. setIsAuth(true) - это финкция которую мы создали в хранилище mobx
//Далее, чтобы все елементы внутри навбара отцентровать (чтобы все елементы были на одном уровне) - обернем все елементы навбара в "<Container fluid>"
//!!!P.S. Заменил <Container fluid> на <Container>, так расположение елементов мне нравиться больше

//Далее сделаем кнопки 'Админ панель' и 'Выйти' кликабельными
//Не забываем, что если в UserStore - юзер this._isAuth = true (или берем условие из БД), то мы не можем перейти на админ панель, и нас перекинет на домашнию страницу
//Импортируем хук useNavigate из 'react-router-dom', который поможет нам динамически передвигаться по страницам (В старой версии назывался useHistory)
//Вешаем слушатель события onClick на конкретный елемент-карточку и вызываем функцию navigate (useNavigate()). В старой версии нужно было вызывать navigate.push()
//В функцию передаем ADMIN_ROUTE и LOGIN_ROUTE, чтобы при нажатии на кнопку перемещатся на их страницы

//После реализации и подвязки к беку логики логина, регестрации и проверки токена, вернемся к навбару у реальзуем нормальную функцию по выходу из учетной записи - logOut
//В функции logOut, после выхода пользователя, мы будем удалять информацию о нем из глобального хранилища mobx: user.setUser({}), user.setIsAuth(false)
//И при нажатии на кнопку "Выйти" будем эту вызывать функцию, вместо старой функции которая нас просто переводила на другую страницу: onClick={() => navigate(LOGIN_ROUTE + '/')

import React, { useContext } from 'react'
import {Context} from '../index'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink style={{color: 'blue'}} to={SHOP_ROUTE}>Max's Store</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ?
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll> {/*P.S. ml-auto не работает, работает - ms-auto*/}
                            <Button variant='outline-ligth' onClick={() => navigate(ADMIN_ROUTE + '/')}>
                                Админ панель
                            </Button>
                            <Button variant='outline-ligth' className="ms-3" onClick={() => logOut()}>
                                Выйти
                            </Button>  {/*Чтобы кнопки не слипались добавим margin_start-3*/}                  
                        </Nav>
                    :
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll> {/*P.S. ml-auto не работает, работает - ms-auto*/}                     
                            <Button onClick={() => user.setIsAuth(true)} variant='outline-ligth'>
                                Авторизация
                            </Button>                                    
                        </Nav>
                    }                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar