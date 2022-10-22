//Этот компонент используется в Admin.js, для добавления новых типов товаров на БД. Компонент идентичен с CreateType.js
//Копируем из react-bootstrap (раздел Modal) компонент под названием Vertically centered и импортируем его зависимости import { Button, Modal }
//Удаляем все стили/настройки из тега <Modal> и все вложеные теги из <Modal.Body>
//Далее передаем в компонент 2 пропса: show - отвечает виден компонент или нет (принимает true/false); onHide - функция которая скрывает модальное окно
//show - это бутстраповские елемент, мы не создаем его где-то отдельно, а просто используем из коробки
//onHide - это созданая нами функция в Admin.js, которая меняет состояние brandVisible и т.д. на false (при false модальное окно закрывается)
//То есть через onHide мы меняем состояние компонента на false, а через show мы передаем это состояние в этот комонет
//И опрокидываем оба пропса в корень модального окна, в тег <Modal>
//Внутрь тела модального окна добавим форму <Form>, а в саму форму добавляем уже инпут <Form.Control />
//Кстати в ствойствах <Form.Control> мы можем задавать, какую функцию он будет выполнять, при помощи встроенных в бутстрап команд, e.g. 'placeholder'
//И добавим еще одну кнопку. Одна - для добавления нового типа товара, другая - для закрытия модального окна

import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const CreateBrand = ({show, onHide}) => {
  return (
    <Modal
    show={show}
    onHide={onHide}   
    size="lg"    
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить новый бренд товара
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control 
          placeholder={'Введите название бренда'}
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='outline-success' onClick={onHide}>Добавить бренд</Button>
      <Button variant='outline-danger' onClick={onHide}>Закрыть окно</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateBrand