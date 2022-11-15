//Этот компонент используется в Admin.js, для добавления новых типов товаров на БД
//Копируем из react-bootstrap (раздел Modal) компонент под названием Vertically centered и импортируем его зависимости import { Button, Modal }
//Удаляем все стили/настройки из тега <Modal> и все вложеные теги из <Modal.Body>
//Далее передаем в компонент 2 пропса: show - отвечает виден компонент или нет (принимает true/false); onHide - функция которая скрывает модальное окно
//show и onHide - это бутстраповские елементы, мы их не создаем где-то отдельно, а просто используем из коробки
//И опрокидываем оба пропса в корень модального окна, в тег <Modal>
//Внутрь тела модального окна добавим форму <Form>, а в саму форму добавляем уже инпут <Form.Control />
//Кстати в ствойствах <Form.Control> мы можем задавать, какую функцию он будет выполнять, при помощи встроенных в бутстрап команд, e.g. 'placeholder'
//И добавим еще одну кнопку. Одна - для добавления нового типа товара, другая - для закрытия модального окна

//На стадии подвязки фронта к беку, также допишем логику по отправке введенного типа товара на бек, чтобы создать новый тип товара в нашей базе данных
//Для этого, для начала, создадим локальное состояние, куда мы будем сохранять данные из нашего инпута: [value, setValue]
//И при изменении инпута будем обновлять наше состояние: onChange={e => setValue(e.target.value)}
//Затем создадим функцию addType, которая в себе будет вызывать функцию createType из deviceAPI.js, и передавать в нее данные из нашего состояния, для отправки их на сервер
//И если запрос прошел успешно, то будем обнулять значения нашего локального хранилища: (data => setValue(''))
//И также не забываем, что параметром в запрос на сервер, нам нужно передать именно объект, а не просто value
//После чего вызываем onHide(), чтобы закрыть наше модальное окно, после успешного добавления нового типа товара

import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createType } from '../../http/deviceAPI'

const CreateType = ({show, onHide}) => {
  const [value, setValue] = useState('')
  const addType = () => {
    createType({name: value}).then(data => setValue(''))
    onHide()
  }

  return (
    <Modal
    show={show}
    onHide={onHide}   
    size="lg"    
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Добавить новый тип товара
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Control 
          placeholder={'Введите название типа'}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='outline-success' onClick={addType}>Добавить тип</Button>
      <Button variant='outline-danger' onClick={onHide}>Закрыть окно</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateType