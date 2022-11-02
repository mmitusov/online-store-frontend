import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { Card, Form } from 'react-bootstrap'

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        
        <Form className='d-flex'>
            {device.brands.map(brand => 
                <Card
                    style={{cursor: 'pointer', width: '18rem'}}                    
                    border = {brand.id === device.selectedBrand.id ? "primary" : "light"}
                    onClick={() => device.setSelectedBrand(brand)} 
                    key={brand.id}
                    className="p-3"                    
                >
                    {brand.name}
                </Card>    
            )}
        </Form>          
               
    )
})

export default BrandBar