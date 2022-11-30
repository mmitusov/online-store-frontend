//Здесь мы отобржаем TypeBar, BrandBar и DeviceList
//Опять же, весь компонент оборачиваем в контейнер. А внутри контейнера добавим Row & Col. Container provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//!!!В отличее от Auth.js, здесь Row должен работать нормально. По документации он работает нормально только с елементами завернутыми в Col. Поэтому и не сработал в Auth.js
//Первый Col (md={3}) выделим под левую панельку (указаны девайсы/их типы), а вторую (md={9}) под карточки магазина с изображением товара
//Начнем с создания левой панелики (md={3}), и для этого создадим новый файл "typeBar" в папке "components".
//После создания левой панельки (typeBar), импортируем ее в Col md={3}. Также отлепим md={3} вместе со всем Row от навбара - 'mt-4'
//Далее создадим карточки магазина (md={9}), для этого создадим новый файл "BrandBar" в папке "components"
//Далее создаем компонент DeviceItem, для отображениея сетки со списками товаров

//После того как мы реализовали авторизацию, далее при подвязке фронта к беку, сделаем так, чтобы типы, бренды и деввайсы отображались динамично, в зависимости от информации на беке
//Начнем с логики fetchTypes их deviceAPI.js
//Сперва обернем весь наш компонет в observer('mobx-react-lite'), чтобы елемент, в зависимости от действий юзера, перерендривался в режиме реального времени (чтобы mobx мог отслеживать изменения значений состояний и при их изменении автоматически обновлять контент страницы)
//Получаем хранилище deviseStore, с помощью хука useContext
//И с помощью useEffect, при загрузке страницы Shop, будем единожды подгружать инфу о наших устройствах. P.S. Чтобы подгрузка выполнялась единожды, в useEffect вторым параметром передаем ПУСТОЙ массив
//Затем в useEffect вызываем функцию fetchTypes из deviceAPI.js. И в случае успешного запроса в хранилище device(deviseStore) вызываем функцию setTypes, чтобы сохранить в хранилище полученные с бека типы товаров (data)
//И теперь когда у нас есть рабочая логика по получаению типов товара с бека, мы можем удалить из deviseStore значения которые мы до этого хардкодили вручную
//И теперь аналлигично добавляем логику для fetchBrands и fetchDevices, которая по логике идентична с fetchTypes
//И также аналлигично мы можем удалить из deviseStore значения всех брендов и девайсов которые мы до этого хардкодили вручную
//!!!Но не забываем, что для нашего сайта мы добавляли пагинацию для отображения наших девайсов
//Поэтому с бека мы получаем не сразу массив объектов девайсов, а объект {count: 2, rows: [,…]}. Где "count" хранит значение для пагинации, а "rows" - уже сам массив объектов с девайсами
//И поэтому в deviseStore, мы сохраняем не просто data, а data.rows
//Однако при подгрузке девайсов, на данном этапе, у нас почему-то не подгружаются картинки девайсов
//Подправим это в компоненте DeviceItem.js - именно он ответственный за отрисовку отдельно взятой карточки и ее елементов
//И после этого, в DevicePage.js, займемся динамическим отображением данных

//Ближе к концу разработки, добавим еще и елемент пагинации внизу страницы, импортировав компонент Pages.js

import React, { useContext, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import TypeBar from '../components/TypeBar'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { fetchBrands, fetchDevices, fetchTypes } from '../http/deviceAPI'
import Pages from '../components/Pages'

const Shop = observer( () => {
  const {device} = useContext(Context) 

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices().then(data => device.setDevices(data.rows))
  }, [])

  return (
    <Container>
      <Row className='mt-4'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col lg={9} md={9} sm={9} >
          <BrandBar />
          <DeviceList />
          <Pages/>
        </Col>
      </Row>
    </Container>
  )
})

export default Shop