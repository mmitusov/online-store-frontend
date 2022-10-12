//DeviceItem отвечает за внешний вид сетки с товарами и отображение той информации, что мы ранее получили с БД в DeviceList
//При деструктуризации device={currDevice}, то мы деструктуризируем сам компонент device, но не его начинку - currDevice. Иначе ничего не работает
//И также временно захардкодим название и его рейтинг

import React, { useContext } from 'react'
import { Card, CardGroup, Image } from 'react-bootstrap'

const DeviceItem = ({device}) => {    
    return (
        <CardGroup md='3'>
            <Card style={{width: 150, cursor: 'pointer'}} border={"light"}>
                <Image width={150} height={150} src={device.img}/>
                <div>
                    <div> Samsung etc. </div>
                    <div>
                        <div> {device.raiting} </div>
                    </div>
                </div>
            </Card>
        </CardGroup>
    )
}

export default DeviceItem