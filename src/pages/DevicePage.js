//Это страница которая будет отображать детали о конкретном товаре, при выборее его из перечня всех товаров в магазине
//Опять же, весь компонент оборачиваем в контейнер. Добавим в контейнер 3 колонки: изображение товара, рейтинг и функцию "добавить в корзину". 
//И разобъем колонки по 4 столбца, чтобы все было поровну: md={4}
//Начнем с колонки для изображения товара

import React from 'react'
import { Col, Container, Image } from 'react-bootstrap'

const DevicePage = () => {
const device = {id: 1, name: "iPhone 14", price: 800, raiting: 5, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg"}

  return (
    <Container>
      <Col md={4}>
        <Image width={300} height={300} src={device.img}/>
      </Col>
      <Col md={4}>
        
      </Col>
      <Col md={4}>
        
      </Col>      
    </Container>
  )
}

export default DevicePage