//

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
                <DeviceItem key={device.id} device={currDevice} />
            )}
        </Row>
    )
})

export default DeviceList