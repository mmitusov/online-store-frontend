//DeviceItem отвечает за внешний вид сетки с товарами и отображение той информации, что мы ранее получили с БД в DeviceList
//Количество колонок сетки задаем в DeviceList, в Row
//При деструктуризации device={currDevice}, то мы деструктуризируем сам компонент device, но не его начинку - currDevice. Иначе ничего не работает
//И также временно захардкодим название и его рейтинг
//Создадим папку assets, где мы будем хранить разные медиа, и загрузим туда картинку звездочки для рейтинга товара
//Выравниваем надписи, отлепим от картинки и сделаем их серыми: className='d-flex justify-content-between align-items-center mt-3 text-black-50'
//Чтобы звездочка была на ровне (в одну линию) с оценкой: className='d-inline-flex' 

import React, { useContext } from 'react'
import { Card, CardGroup, Image } from 'react-bootstrap'
import starImg from '../assets/Star_full.png'

const DeviceItem = ({device}) => {    
    return (
        <CardGroup>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={device.img}/>
                <div className='d-flex justify-content-between align-items-center mt-3 text-black-50'>
                    <div> Samsung etc. </div>
                    <div className='d-inline-flex align-items-center'>
                        <div> {device.raiting} </div>
                        <Image width={20} height={20} src={starImg}/>
                    </div>                    
                </div>
                <div> {device.name} </div>
            </Card>
        </CardGroup>
    )
}

export default DeviceItem