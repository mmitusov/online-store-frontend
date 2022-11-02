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

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <NavLink style={{color: 'blue'}} to={SHOP_ROUTE}>Max's Store</NavLink>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {user.isAuth ?
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll> 
                            <Button variant='outline-ligth' onClick={() => navigate(ADMIN_ROUTE + '/')}>
                                Админ панель
                            </Button>
                            <Button variant='outline-ligth' className="ms-3" onClick={() => navigate(LOGIN_ROUTE + '/')}>
                                Выйти
                            </Button>                 
                        </Nav>
                    :
                        <Nav className="ms-auto my-2 my-lg-0" style={{color: 'blue'}} navbarScroll>                  
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