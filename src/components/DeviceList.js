//Это входной компонент для отображениея сетки со списками товаров. Здесь мы первоначально пробегаемся по товарам из нашей БД
//Далее, пропсами, мы передаем товары что мы получили из нашей БД, в следующий компонент - DeviceItem
//И уже DeviceItem будет отвечать за внешний вид сетки с товарами и отображение той информации, что мы ранее получили с БД
//Поэтому с получением каждого товара мы создаем отдельный DeviceItem и передаем в него пропс, по которому он будет отрисовывать конкретный товар

import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    
    return (
        <Row class-className='d-flex'>
            {device.devices.map(currDevice =>
                <DeviceItem key={currDevice.id} device={currDevice} />
            )}
        </Row>
    )
})

export default DeviceList