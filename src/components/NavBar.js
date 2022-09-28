//Вначале сразу получаем глабальное хранилище UserStore (mobx) из Context. Еедь в зависимости от того авторизован пользователь или нет - наш NavBаr будет меняться
//Далее копируем с сайта bootstrap react нужный нам навбар и импортируем необходимые для его работы модули. Нужные модули указаны на сайте
//После чего експортируем NavBаr и импортируем его в App.js, чтобы он отображался у нас на каждой странице
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
import React, { useContext } from 'react'
import {Context} from '../index'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <NavLink style={{color: 'blue'}} to={SHOP_ROUTE}>Max's Store</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ?
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll> {/*P.S. ml-auto не работает, работает - ms-auto*/}
                            <Button variant='outline-ligth'>Админ панель</Button>
                            <Button variant='outline-ligth' className="ms-3">Выйти</Button>  {/*Чтобы кнопки не слипались добавим margin_start-3*/}                  
                        </Nav>
                    :
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll> {/*P.S. ml-auto не работает, работает - ms-auto*/}                     
                            <Button onClick={() => user.setIsAuth(true)} variant='outline-ligth'>Авторизация</Button>                                    
                        </Nav>
                    }                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar