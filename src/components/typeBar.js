//Это компонент для компонент Shop.js
//Начнем создание компонента с того, что обернем всю функцию в observer ('mobx-react-lite') чтобы mobx мог отслеживать изменения значений состояний в реальном времени и при их изменении автоматически обновлять контент страницы
//Теперь добавим глабальное хранилище deviceStore (mobx) из Context (хук { useContext } from 'react' + {Context} from '../index')
//Выберем с сайта bootstrap-react нужный нам компонент (у нас это List Group) и импортируем необходимые для его работы модули 
//После чего можем уже добавлять текущий компонент в Shop.js, для проверки его работы
//Заменим исходное наполнение ListGroup. Вместо него пробежимся при помощи .map() по тимам товаров из нашего хранилища deviceStore. Используя {device.types.map()}, мы вызываем get types() метод из deviceStore
//И в итоге, каждый тип находящийся в хранилище, мы будем отрисовывать внутри <ListGroup.Item>. И поскольку мы итерируемся по списку - не забываем указать ключ "key={type.id}"

import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    
    return (
        <ListGroup>
            {device.types.map(type => 
                <ListGroup.Item key={type.id}>{type.name}</ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default TypeBar