//Опять же, весь компонент оборачиваем в контейнер. А внутри контейнера добавим Row & Col
//В отличее от Auth.js, здесь Row должен работать нормально. По документации он работает нормально только с елементами завернутыми в Col. Поэтому и не сработал в Auth.js
//Первый Col (md={3}) выделим под левую панельку (указаны девайсы/их типы), а вторую (md={9}) под карточки магазина с изображением товара
//Начнем с создания левой панелики (md={3}), и для этого создадим новый файл "typeBar" в папке "components".
//После создания левой панельки (typeBar), импортируем ее в Col md={3}. Также отлепим md={3} вместе со всем Row от навбара - 'mt-4'
//

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import TypeBar from '../components/typeBar'

const Shop = () => {
  return (
    <Container>
      <Row className='mt-4'>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>

        </Col>
      </Row>
    </Container>
  )
}

export default Shop