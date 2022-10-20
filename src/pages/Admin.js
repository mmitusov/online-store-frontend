//Наша админ панель
//Сперва завернем компонеот в Container
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 

import React from 'react'
import { Button, Container } from 'react-bootstrap'

const Admin = () => {
  return (
    <Container>
      <Button>Добавить тип</Button>
      <Button>Добавить бренд</Button>
      <Button>Добавить устройство</Button>
    </Container>
  )
}

export default Admin