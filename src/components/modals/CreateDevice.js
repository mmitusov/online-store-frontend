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