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

//На стадии подвязки фронта к беку, также допишем логику по отправке ряда введенной информации о товаре на бек, чтобы создать новое устройство в нашей базе данных
//Логика будет немного сложнее той, что указана в CreateType.js и CreateBrand.js
//В данном компоненте у нас имеется много разных импутов, которые нам сперва нужно оживить и записывать их значения в соответствующее состояние (useState)
//Для этого сперва займемся созданием состояний: name, price, file
//Далее создадим функцию selectFile - которая будет вызываться когда когда мы будем перетаскивать файлы с нашего компьютера в браузер, для дальнейшей загрузки их на бек
//После чего onChange в поле с "type='file'" будем вызывать эту функцию и по нулевому индексу (так как мы получаем объект и из него мы хотим достать сам файл) сохранять в состоянии тот файл, что перетащил в браузер наш юзер
//Далее при вводе данных оживляем инпуты с названием и стоимостью устройства: setName, setPrice
//Но в случае с ценой, дополнительно еще приведем наши вводные данные к числовому значению - setPrice(Number(e.target.value))}

//Чтобы привязать новый девайс к одному из существующих брендов и типов, то на выпадающее меню, где отображается их перечень (сохраненный в mobx с бека), повесим слушатель события onClick
//Но предварительно, при открытии модального окна, используя useEffect, будем подгружать эти типы с бека и сохраниять в mobx
//Делаем мы это для того, потому что в случае если мы не зашли на стартовую страницу Shop.js, а сразу перешли по ссылке на админ панель, то информация с бека тогда у нас автоматически не подгружается
//Далее при нажатии на один из брендов или типов из списка, мы будем передавать этот бренд или тип в соответствующею функцию из глобального mobx хранилища - device.setSelectedType(type)/Brand
//Можно было бы создать и воспользоваться локальным хранилищем, для сохранения выбранного инпута локально (при помощи useState), но потренируемся работать с mobx
//И при выборе бренда/типа из выпадающего меню, также будем менять и название соответствующего выпадающего меню с базового на этот бренда/типа, чтобы мы явно видели что мы выбрали - {device.selectedType.name || 'Присвойте тип товара'}
//Но для отображения того что мы выбрали, нам нужно также обернуть весь компонент в observer(), чтобы страница автоматом ререндерелась, и название стандартной кнопки менялась на тот текст, что мы выбрали с выпадающего меню

//Далее разберемся с тем как добавлять характеристики товара в локальное хранилище, после того как админ ввел необходимые данные в инпут, ведь сейчас они добавляются пустыми
//Для этого, сперва создадим функцию changeInfo, в ней, при помощи .map, пробегаемся по массиву объектов и если номер объекта итерации (i.number) совпадает с номером, что мы передаем в функцию (number), то тогда мы возвращаем новый объект
//И в этот новый объект разварачиваем нашу характеристику {...i,} и после чего по ключу заменяем у нее поле на новое значение value которое мы передаем в функцию ([key]: value). А если номер не совпадает то возвращаем объект без внесения в него изменений
//И также не забываем оживить наше поле характеристик товара
//Для этого под каждый объект итерации в массиве, будем выцеплять значение его импута (value={i.title/description}) и затем при изменении инпута уже вызывать функцию changeInfo - onChange={(e) => changeInfo('title/description', e.target.value, i.number)}
//Внутри передаем 'title/description' как наш key, value - это наш инпут; и передаем  number - получаем его из объекта текущей итерации (i.number). P.S. changeInfo = (key, value, number)
//После чего, описание характеристик теперь будет автоматически сохраняться в локальное хранилище

//И теперь наконец реализуем функцию которая будет отправлять запрос на сервер и создавать новое устройство из введенной нами информации
//Функцию назовем addDevice и будем вызывать ее при нажатии на кнопку "Добавить девайс"
//Внутри вызываем функцию createDevice(), которой мы отправляем запрос на сервер
//Однако мы также должны не забывать, что в случае создании девайса, бек у нас принимает данные не в формате JSON, а FormData
//Поэтому также создаем объект FormData и по методу append передаем в него введенные пользователем параметры - .append(ключ, значение). После чего передаем составленную нами formData в addDevice()
//formData.append('info', JSON.stringify(info)) - Так как обычный массив невозможно передать, поэтому переганяем в JSON, а на сервере уже будем перегонять назад в массив
//И при успешном запросе не забываем прятать наше модульное окно - onHide()

import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap'
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI'
import {Context} from '../../index'

const CreateDevice = observer( ({show, onHide}) => {
  const {device} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))    
  }, [])
  
  const addInfo = () => {
    setInfo([...info, {title:'', description:'', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) => {
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = (e) => {
    setFile(e.target.files[0]) //console.log(e.target.files) - для проверки работы    
  }

  const addDevice = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info)) //Так как обычный массив невозможно передать, поэтому переганяем в JSON, а на сервере уже будем перегонять назад в массив
    createDevice(formData).then(data => onHide())
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
            <Dropdown.Toggle>{device.selectedType.name || 'Присвойте тип товара'}</Dropdown.Toggle>
              <Dropdown.Menu>{device.types.map(type => 
                <Dropdown.Item key={type.id} onClick={() => device.setSelectedType(type)}>
                  {type.name}
                </Dropdown.Item>
              )}</Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3 mb-3'>
            <Dropdown.Toggle>{device.selectedBrand.name || 'Присвойте бренд товара'}</Dropdown.Toggle>
              <Dropdown.Menu>{device.brands.map(brand => 
                <Dropdown.Item key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
                  {brand.name}
                </Dropdown.Item>
              )}</Dropdown.Menu>
          </Dropdown>
        </div>

        <Form.Control 
          className='mt-3'
          placeholder='Введите наименование устройства'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control 
          className='mt-3'
          placeholder='Введите стоимость устройства'
          type='number'
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <Form.Control 
          className='mt-3'            
          type='file'
          onChange={selectFile}
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
                value={i.title}
                onChange={(e) => changeInfo('title', e.target.value, i.number)}
              />              
            </Col>
            <Col md={4}>
              <Form.Control 
                placeholder='Описание характеристики'
                value={i.description}
                onChange={(e) => changeInfo('description', e.target.value, i.number)}
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
      <Button variant='outline-success' onClick={addDevice}>Добавить девайс</Button>
      <Button variant='outline-danger' onClick={onHide}>Закрыть окно</Button>
    </Modal.Footer>
  </Modal>
  )
})

export default CreateDevice