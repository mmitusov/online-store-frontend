//Наша админ панель
//Сперва завернем компонеот в Container
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width.
//Добавим три кнопки. Настроим их стиль и отлепим их друг от друга ('mt-2')
//При нажатии на каждую из кнопок должно всплывать модальное окно, с разными инпутами. Для этого повесим на кнопки слушатель событий
//А функционал модального окна возмем из react-bootstrap и в разделе Modal, выберем Vertically centered
//Для чистоты кода, мы не будем добавлять код модальных окон прямиком в Admin.js, а вынесем их как отдельные компоненты. И будем уже импортировать их от туда
//Для этого создадим под данные елементы новую папку modals внутри папки components. Где каждое модальное окно будет как отдельный компонент 
//Импортируем наши новые компонеты отдельно от кнопок (под ними). Ведь все равно окно будет появляться не в пределах одной кнопки, а на весь екран
//Каждая кнопка буде включать появление каждого отдельного модального окна
//Далее создадим три состояния (с помощью хуков), которые будут отвечать за то, видим ли мы модальное окно или нет: brandVisible, deviceVisible, typeVisible
//Теперь мы можем, при помощи пропсов show={}, передавать значения этх состояний в модальные окна, чтобы отобразить их
//И также передадим в наши модальные окна функцию, которая эти окна будет закрывать
//И остальсь написать логику onClick() которая бы откравала бы эти модальные окна при нажатии, на кнопку "Добавить тип" и т.д.
//onHide - закрывает модальное (созданая нами функция), onClick - открывает модальное (слушатель события в React)

import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateBrand from '../components/modals/CreateBrand'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'

const Admin = () => {
  const [typeVisible, setTypeVisible] = useState(false)
  const [brandVisible, setBrandVisible] = useState(false)
  const [deviceVisible, setDeviceVisible] = useState(false)  

  return (
    <Container className='d-flex flex-column'>
      <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setTypeVisible(true)}>
        Добавить тип
      </Button>
      <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setBrandVisible(true)}>
        Добавить бренд
      </Button>
      <Button variant={'outline-dark'} className='mt-4 p-2' onClick={() => setDeviceVisible(true)}>
        Добавить устройство
      </Button>

      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
      <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>      
    </Container>
  )
}

export default Admin