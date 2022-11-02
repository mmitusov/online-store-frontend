import { Card, CardGroup, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import starImg from '../assets/Star_full.png'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    
    return (
        <CardGroup onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 200, cursor: 'pointer'}} border={"light"}>
                <Image width={180} src={device.img} className='fluid'/>
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