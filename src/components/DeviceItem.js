//DeviceItem отвечает за внешний вид сетки с товарами и отображение той информации, что мы ранее получили с БД в DeviceList
//Количество колонок сетки задаем в DeviceList, в Row
//При деструктуризации device={currDevice}, то мы деструктуризируем сам компонент device, но не его начинку - currDevice. Иначе ничего не работает
//И также временно захардкодим название и его рейтинг
//Создадим папку assets, где мы будем хранить разные медиа, и загрузим туда картинку звездочки для рейтинга товара
//Выравниваем надписи, отлепим от картинки и сделаем их серыми: className='d-flex justify-content-between align-items-center mt-3 text-black-50'
//Чтобы звездочка была на ровне (в одну линию) с оценкой: className='d-inline-flex'
//!!!P.S. Чтобы картинки не выглядели как сжатый квадрат, в <Image/> я убрал параметр height и добавил className='fluid'. Теперь картинка не искажается и подстраивается под контейнер

//Далее сделаем товары кликабельными, чтобы переходить на страницу конкретного товара при клике на него
//Для этого импортируем хук useNavigate из 'react-router-dom', который поможет нам динамически передвигаться по страницам (раньше назывался useHistory)
//Вешаем слушатель события onClick на конкретный елемент-карточку и вызываем функцию navigate (useNavigate()). В старой версии нужно было вызывать navigate.push()
//В функцию передаем DEVICE_ROUTE вместе с id-шником конкретного товара '+ '/' + device.id', чтобы при нажатии на товар перемещатся прямиком на адрес его страницы
//То есть, мы выцепляем id-шник конкретного товара из БД и по нему делаем запрос на сервер, для получения данных о товаре (нас полностью преводит с текущей страницы на страницу с товаром)

//После того как мы реализовали авторизацию, при подвязке фронта к беку, возникла ошибка - при отрисовке девайсов с бека, не подгружаются сопутствующие им картинки
//Исправим это в поле <Image>, путем добавления к названию фалйла src={device.img}, url сервера, где этот файл хранится. url берем из созданой нами системной переменной - process.env.REACT_APP_API_URL

import { Card, CardGroup, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import starImg from '../assets/Star_full.png'
import { DEVICE_ROUTE } from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()
    
    return (
        <CardGroup onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 200, cursor: 'pointer'}} border={"light"}>
                <Image width={180} src={process.env.REACT_APP_API_URL + device.img} className='fluid'/>
                <div className='d-flex justify-content-between align-items-center mt-3 text-black-50'>
                    <div> Samsung etc. </div>
                    <div className='d-inline-flex align-items-center'>
                        <div> {device.rating} </div>
                        <Image width={20} height={20} src={starImg}/>
                    </div>                    
                </div>
                <div> {device.name} </div>
            </Card>
        </CardGroup>
    )
}

export default DeviceItem