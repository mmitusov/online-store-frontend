//Это страница которая будет отображать детали о конкретном товаре, при выборее его из перечня всех товаров в магазине
//Опять же, весь компонент оборачиваем в контейнер. Добавим в контейнер 3 колонки: изображение товара, рейтинг и функцию "добавить в корзину".
//Container Component provides a way to center and horizontally pad the contents of our application. It is used when the user wants the responsive pixel width. 
//И разобъем колонки по 4 столбца, чтобы все было поровну: md={4}
//Начнем с колонки для изображения товара. Задаем размеры картинки и отлепляем ее от навбара

//Далее займемся колонкой с названием товара и его оценкой
//Чтобы цифра с рейтингом была посеридине: className='d-flex align-items-center justify-content-center' -> вкл. флекс, выравниваем горизонтально и вертикально
//Ставим картинку как задний фон на блок div для рейтинга: style={{background: `url(${bigStarImg}) no-repeat center`, width:'300px', height:'300px', backgroundSize:"cover", fontSize:44}}
//'no-repeat center center' - чтобы картинка не повторялась+центр по вертикали/горизонтали; backgroundSize:"cover" - чтобы картинка была размером с контейнер
//Далее выравниваем все наши емлементы в Col: className='d-flex flex-column align-items-center justify-content-center'
//'flex-column' - елементы располагаются в колонку, а не в ряд, 'align-items-center' - вертикально, 'align-items-center' - горизонтально
//После чего обернем все <Col> в один общий <Row>, чтобы все наши колонки отобразились в один горизонтальный ряд, а не шли одна под другой
//Мы используем колонки, чтобы ограничить контейнер по ширине. Иначе наши контейнера занимал бы всю ширину и тогда мы не смогли бы расположить их в ряд (так как у каждого из них уже занята вся ширина)

//Далее займемся колонкой по добавлению товара в корзину
//Зададим ей параметры: className='d-flex flex-column align-items-center justify-content-around'; style={{width:300, height:300, fontSize:32, border: '5px solid lightgrey'}}
//Теперь оталось добавить характеристики товара. Под это создадим отдельный массив: ПОТОМ БУДЕМ ПОЛУЧАТЬ С БЕКА
//В самый низ добавляем еще один Row под характеристики
//Пробегаемся по БД и вытягиваем характеристики. Каждую из них отрисовываем в собственную строку (название: описание).
//Чтобы сделать строки разных цветов, то каждую характеристику под четным индексом будем отрисовывать с серым фоном
//P.S. Если используем styles то задаем ширину как: style={widht:300}; А если указываем ширину в div, то: <Image width={300}/>

import React from 'react'
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap'
import bigStarImg from '../assets/Star_outline.png'

const DevicePage = () => {
const device = {id: 1, name: "iPhone 14", price: 800, raiting: 5, img: "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iphone13_hero_geo_09142021_inline.jpg.large.jpg"}
const description = [
  {id: 1, title:"RAM", description:'8 гб'},
  {id: 2, title:"ROM", description:'64 гб'},
  {id: 3, title:"BOOM", description:'128 гб'}
]

  return (
    <Container className='mt-3'>
      <Row>        
        <Col md={4} className='d-flex align-items-center justify-content-center'>
          <Image width={250} height={300} src={device.img}/>
        </Col>

        <Col md={4}> {/* Но если здесь мы завернем <Col> в <Row>, то стили не будут работать (в новой версии бутстрап так делать не желательно)*/}
          <Col className='d-flex flex-column align-items-center justify-content-center'>
            <h2> {device.name} </h2>
            <div 
              className='d-flex align-items-center justify-content-center'
              style={{background: `url(${bigStarImg}) no-repeat center center`, width:'280px', height:'280px', backgroundSize:'cover', fontSize:44}}
            >
              {device.raiting}              
            </div>
          </Col>           
        </Col>

        <Col md={4}>
          <Card
            className='d-flex flex-column align-items-center justify-content-around'
            style={{width:300, height:300, fontSize:32, border: '5px solid lightgrey'}}
          >
            <h3> От {device.price} долл.</h3>
            <Button variant='outline-dark'>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>

      <Row className='d-flex flex-column m-3'>
        <h1>Характеристики</h1>
        {description.map((info, index) => 
          <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding:10}}> 
            {info.title}: {info.description}
          </Row>   
        )}
      </Row>          
    </Container>
  )
}

export default DevicePage