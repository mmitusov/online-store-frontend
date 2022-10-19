//Это страница которая будет отображать детали о конкретном товаре, при выборее его из перечня всех товаров в магазине
//Опять же, весь компонент оборачиваем в контейнер. Добавим в контейнер 3 колонки: изображение товара, рейтинг и функцию "добавить в корзину".
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//И разобъем колонки по 4 столбца, чтобы все было поровну: md={4}
//Начнем с колонки для изображения товара

//
//P.S. Если используем стили то задаем ширину как: style={widht:300}; А если указываем ширину в div, то: <Image width={300}/>

import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import bigStarImg from '../assets/Star_outline.png'

const DevicePage = () => {
const device = {id: 1, name: "iPhone 14", price: 800, raiting: 5, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg"}

  return (
    <Container className='mt-3'>
      <Row md={4}>
        <Image width={300} height={300} src={device.img}/>
      </Row>

      <Row md={4}>
        <Col className='d-flex flex-column align-items-center'>
          <h2> {device.name} </h2>
          <div 
            className='d-flex align-items-center justify-content-center'
            style={{background: `url(${bigStarImg}) no-repeat center center`, widht:300, height:300, backgroundSize:"cover"}}
          >
            {device.raiting}              
          </div>
        </Col>           
      </Row>

      <Row md={4}>
        
      </Row>      
    </Container>
  )
}

export default DevicePage