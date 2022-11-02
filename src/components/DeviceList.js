import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { Row } from 'react-bootstrap'
import DeviceItem from './DeviceItem'

const DeviceList = observer(() => {
    const {device} = useContext(Context)
    
    return (
        <Row className='d-flex mt-3' xs={2} md={4} lg={9}>
            {device.devices.map(currDevice =>
                <DeviceItem key={currDevice.id} device={currDevice} />
            )}
        </Row>
    )
})

export default DeviceList