//Этот компонент используется в Admin.js, для добавления новых типов товаров на БД 
//Компонент значительно отличается от CreateType.js и CreateBrand.js, однако мы используем такую же бутстраповскую основу компонента - Vertically centered, просто перерабатываем ее
//Копируем из react-bootstrap (раздел Modal) компонент под названием Vertically centered и импортируем его зависимости import { Button, Modal }
//Далее передаем в компонент 2 пропса: show - отвечает виден компонент или нет (принимает true/false); onHide - функция которая скрывает модальное окно
//show - это бутстраповские елемент, мы не создаем его где-то отдельно, а просто используем из коробки
//onHide - это созданая нами функция в Admin.js, которая меняет состояние brandVisible и т.д. на false (при false модальное окно закрывается)
//То есть через onHide мы меняем состояние компонента на false, а через show мы передаем это состояние в этот комонет
//И опрокидываем оба пропса в корень модального окна, в тег <Modal>
//И добавим еще одну кнопку. Одна - для добавления нового типа товара, другая - для закрытия модального окна

//Здесь нам понадобится воспользоватся нашим deviceStore хранилищем (mobx), поэтому получаем его с помощью хука useContext()
//Дабавляем бутстраповский <Dropdown>. В нем будет храниться <Dropdown.Toggle> который активирует выпадающий список, для выбора типа/бренда для нового устройства
//Сам же список будет отрисовыватьчя при помощи <Dropdown.Menu> и <Dropdown.Item>
//Дальше мы пробежимся по всем типам девайсам из нашей БД (device.types.map()) и имя каджого из типов отресуем в отдельном <Dropdown.Item>
//Теперь продублируем такую же логику и для брендов
//Под <Dropdown> добавим 1й <Form.Control />, для инпута, чтобы мы могли вводить/задавать имя нового товара
//Кстати в ствойствах <Form.Control> мы можем задавать, какую функцию он будет выполнять, при помощи встроенных в бутстрап команд
//Например: placeholder - ввод текста и цифр, placeholder+type='number' - принимает ввод только цифр, type='file' - превращается в поле по загрузке файлов
//Поэтому ниже добавим 2й и 3й <Form.Control />, но который уже будет принимать цену товара и картинку под него
//И в конце всех инпутов, для красоты, добавим разделительную черту <hr/>
//Дополнительно, я лично обернул оба <Dropdown> в className='d-flex justify-content-around', чтобы они шли не один под одним, а симетрично в одну строку

import React from 'react'
import { useContext } from 'react'
import { Button, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import {Context} from '../../index'

const CreateDevice = ({show, onHide}) => {
  const {device} = useContext(Context)

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
        
        <div className='d-flex justify-content-around'>
          <Dropdown className='mt-3 mb-3'>
            <Dropdown.Toggle>Присвойте тип товара</Dropdown.Toggle>
              <Dropdown.Menu>{device.types.map(type => 
                <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
              )}</Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3 mb-3'>
            <Dropdown.Toggle>Присвойте бренд товара</Dropdown.Toggle>
              <Dropdown.Menu>{device.brands.map(brand => 
                <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
              )}</Dropdown.Menu>
          </Dropdown>
        </div>

        <Form.Control 
          className='mt-3'
          placeholder='Введите наименование устройства'
        />
        <Form.Control 
          className='mt-3'
          placeholder='Введите стоимость устройства'
          type='number'
        />
        <Form.Control 
          className='mt-3'            
          type='file'
        />
        <hr/>

      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='outline-success' onClick={onHide}>Добавить бренд</Button>
      <Button variant='outline-danger' onClick={onHide}>Закрыть окно</Button>
    </Modal.Footer>
  </Modal>
  )
}

export default CreateDevice