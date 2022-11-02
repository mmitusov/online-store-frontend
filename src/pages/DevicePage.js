import React from 'react'
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap'
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
      <Row className='d-flex align-items-center'>        
        <Col md={4} className='d-flex align-items-center justify-content-center'>
          <Image width={250} height={300} src={device.img}/>
        </Col>

        <Col md={4}>
          <Form className='d-flex flex-column align-items-center justify-content-center'>
            <h2> {device.name} </h2>
            <div 
              className='d-flex align-items-center justify-content-center'
              style={{background: `url(${bigStarImg}) no-repeat center center`, width:'300px', height:'300px', backgroundSize:'cover', fontSize:44}}
            >
              {device.raiting}              
            </div>            
          </Form>           
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