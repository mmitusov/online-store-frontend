//Этот компонент используется в Admin.js, для добавления новых типов товаров на БД 
//Компонент значительно отличается от CreateType.js и CreateBrand.js, однако мы используем такую же бутстраповскую основу компонента - Vertically centered, просто перерабатываем ее
//Копируем из react-bootstrap (раздел Modal) компонент под названием Vertically centered и импортируем его зависимости import { Button, Modal }
//Далее передаем в компонент 2 пропса: show - отвечает виден компонент или нет (принимает true/false); onHide - функция которая скрывает модальное окно
//show - это бутстраповские елемент, мы не создаем его где-то отдельно, а просто используем из коробки
//onHide - это созданая нами функция в Admin.js, которая меняет состояние brandVisible и т.д. на false (при false модальное окно закрывается)
//То есть через onHide мы меняем состояние компонента на false, а через show мы передаем это состояние в этот комонет
//И опрокидываем оба пропса в корень модального окна, в тег <Modal>
//И добавим еще одну кнопку. Одна - для добавления нового типа товара, другая - для закрытия модального окна

//Здесь нам понадобится воспользоватся нашим deviceStore хранилищем (mobx), для показа списков брендов и типов товара, поэтому получаем его с помощью хука useContext()
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

//Также для каждого устройства нужно будет добавлять массив с описанием его характеристик, для этого создадим отдельное состояние c пустым массивом - {info, setInfo}
//Под <hr/> создаем кнопку для добавление новых характеристик товара
//И теперь реализуем функцию addInfo(), с помощюь которой, мы эти характеристики будем добавлять и хук [info, setInfo] с изначально пустым массивом, который эти характеристики будет запоминать
//И при нажатии на кнопку "Добавить новую характеристику товара" будем вызывать addInfo()
//В addInfo вызываем функцию setInfo() которая изменяет текущее состояние компонента
//В нее передаем массив, внутри которого, 1м параметром мы копируем/разворачиваем все данные из уже существующего массива 
//А 2м параметром добавляем новый елемент {title:'', description:'', number: Date.now()} (где "number: Date.now()" мы будем использовать как уникальный id, чтобы не заморачиваться с созданием другой логики новых и уникальных id)
//То есть, к какждому новому индексу i, мы присваеваем собственнй объект {title:'', description:'', number: Date.now()}
//Таким образом, у нас текущий массив заменяется таким же, но уже с новым в нем елементом/объектом
//Как пример, логика чем-то похожа на пример ниже:
      // const memo = []
      // const addInfo = () => {
      //     memo.push(...memo, 1) - тотлько тут, так как .push() и классы работают по разному, то при каждом вызове, мы не добавляем по одному елементу, а берем всю имеющеюся длину и опять накладывам ее сверху, но для наглядности примера пойдет
      //   }
      // addInfo()
      // addInfo()
      // console.log(memo)
//И далее, при помощи {info.map(i =>)}, мы проверяем количество текущий елементов/индексов в состоянии [info, setInfo], и в соответствии с количеством елементов в массиве, динамически отрисовываем такое-же количество новых <Row>
//То есть, для каждого елемента в [info, setInfo], отрисовываем свой <Row>

//Осталось создать логику по удалению уже существующих елементов из [info, setInfo]
//И теперь реализуем функцию removeInfo(), с помощюь которой, мы эти характеристики будем удалять 
//При нажатии на кнопку "Удалить" будем вызывать removeInfo(), передавая в нее параметром нашу имплементацию уникального id-шника - "i.number" 
//Где i - это индекс под которым находится один из наших <Row>, что отрисовывается в {info.map(i =>)}. А .number это уникальный id, который приписан к этому <Row>
//В removeInfo вызываем функцию setInfo() которая изменяет текущее состояние компонента
//Далее мы пробегаемся при помощь .filter(), по [info, setInfo], чтобы определить какие елементы продолжать отображать, а какой удалить из {info.map(i =>)}
//Тут мы пользуемся таким трюком как: array.filter(item => Boolean(item)), где .filter вернет только те елементы, что === true
//То есть, пока условие, что 'текущий id не равняется тому, что мы ищем' === true/ '(i.number !== number)===true', эти елементы будут возвращаться при помощи .filter()
//Но как только мы попадаем на '(i.number !== number)===false', то так как Boolean=false, этот елемент не возвращается .filter()
//Таким образом он мы убираем его из масива

import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import {Context} from '../../index'

const CreateDevice = ({show, onHide}) => {
  const {device} = useContext(Context)
  const [info, setInfo] = useState([])
  
  const addInfo = () => {
    setInfo([...info, {title:'', description:'', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
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

        <Button variant='outline-dark' onClick={addInfo}>
          Добавить новую характеристику товара
        </Button>
        {info.map(i => 
          <Row className='mt-3' key={i.number}> {/*React всегда просит казывать key в уникалльным id*/}
            <Col md={4}>
              <Form.Control 
                placeholder='Название характеристики'
              />              
            </Col>
            <Col md={4}>
              <Form.Control 
                placeholder='Описание характеристики'
              />
            </Col>
            <Col md={4}>
              <Button variant='outline-danger' onClick={() => removeInfo(i.number)}>
                Удалить
              </Button>
            </Col>
          </Row>  
        )}

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