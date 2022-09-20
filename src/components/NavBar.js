//Вначале сразу получаем UserStore (mobx) из Context. Еедь в зависимости от того авторизован пользователь или нет - наш NavBаr будет меняться
//Далее копируем с сайта bootstrap react нужный нам навбар и импортируем необходимые для его работы модули. Нужные модули указаны на сайте
//После чего експортируем NavBаr и импортируем его в App.js, чтобы он отображался у нас на каждой странице
//То есть, так как в App.js отображаются все видимые нам компоненты, то сверху мы помещаем NavBar (виден всегда), а под ним AppRouter который будет уже отображать под NavBar тот компонет который будет указан в AppRouter
//Далее поменяем NavLink из bootstrap на NavLink из react-router-dom, чтобы мы могли переключаться по нашим pages (пользоваться нашим react-router-dom)
//Далее быстренько настроим стиль нашего нового елемента. P.S. Чтобы не тратить время на создание файлов со стилями, некоторые стили будем прописывать inline прям в HTML елементах 
import React, { useContext } from 'react'
import {Context} from '../index'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';

function NavBar() {
    const {user} = useContext(Context)
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
            <NavLink style={{color: 'blue'}} to={SHOP_ROUTE}>Max's Store</NavLink>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                    Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                    Something else here
                    </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                    Link
                </Nav.Link>
                </Nav>
                <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar