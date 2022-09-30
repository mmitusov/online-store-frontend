//Это компонент для компонент Shop.js
//Начнем создание компонента с того, что обернем всю функцию в observer ('mobx-react-lite') чтобы mobx мог отслеживать изменения значений состояний в реальном времени и при их изменении автоматически обновлять контент страницы
//Теперь добавим глабальное хранилище deviceStore (mobx) из Context (хук { useContext } from 'react' + {Context} from '../index')
//Выберем с сайта bootstrap-react нужный нам компонент (у нас это List Group) и импортируем необходимые для его работы модули 
//После чего можем уже добавлять текущий компонент в Shop.js, для проверки его работы
//Заменим исходное наполнение ListGroup. Вместо него пробежимся при помощи .map() по тимам товаров из нашего хранилища deviceStore. Используя {device.types.map()}, мы вызываем get types() метод из deviceStore
//И в итоге, каждый тип находящийся в хранилище, мы будем отрисовывать внутри <ListGroup.Item>. И поскольку мы итерируемся по списку - не забываем указать ключ "key={type.id}"

//После добавления в deviceStore логики setSelectedType, теперь привяжем ее к текущему файлу. Мы будем вызывать setSelectedType при нажатии на конкретный тип товара
//И чтобы тип товара на который мы нажимаем как-то визуально отличался, создадим пропс active = {type.id === device.selectedType.id}
//Когда active === true, то елемент/елементы в ListGroup.Item будут подсвечиваться каким либо цветом
//В итоге, при надатии на любой тип товара, мы дублируем его в setSelectedType. После чего, если .id добавленного/сохраненного при нажатии кнопки типа товара === .id изначально существующего типа, то он будет подсвечен отдельным цветом
//А также, чтобы было понятно что наши елементы кликабельны - при наведении на елемент, курсор будет менятся на поинтер style={{cursor: "pointer"}}
import React, { useContext } from 'react'
import {Context} from '../index'
import { observer } from 'mobx-react-lite'
import { ListGroup } from 'react-bootstrap'

const TypeBar = observer(() => {
    const {device} = useContext(Context)
    
    return (
        <ListGroup>
            {device.types.map(type => //type от сюда
                <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active = {type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)} ////type передаем сюда
                    key={type.id}                    
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default TypeBar