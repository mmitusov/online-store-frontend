//Это компонент для компонент Shop.js
//Начнем создание компонента с того, что обернем всю функцию в observer ('mobx-react-lite') чтобы mobx мог отслеживать изменения значений состояний в реальном времени и при их изменении автоматически обновлять контент страницы
//Теперь добавим глабальное хранилище deviceStore (mobx) из Context (хук { useContext } from 'react' + {Context} from '../index')
//Выберем с сайта bootstrap-react нужный нам компонент (у нас это List Group) и импортируем необходимые для его работы модули 
//После чего можем уже добавлять текущий компонент в Shop.js, для проверки его работы

import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    
    return (
        <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
        </ListGroup>
    )
})

export default TypeBar