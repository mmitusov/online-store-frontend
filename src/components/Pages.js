//Данный компонент будет отвечать за работу пагинции
//В самом начале, можем срузу обернуть компонент в observer ('mobx-react-lite'), чтобы елемент, в зависимости от действий юзера, перерендривался в режиме реального времени (чтобы mobx мог отслеживать изменения значений состояний и при их изменении автоматически обновлять контент страницы)
//Далее при помощи useContext получаем глобальное хранилище device store (mobx)
//Затем отрисуем черновой вариант отображения страничек, при помощи заполненого массива: [1,2,3,4,5]
//Далее создаем заглавный ботстраповский тег/компонет пагинации <Pagination>, который есть частью react-bootstrap
//Затем пробегаемся по массиву pages при помощи .map() и для каждой страницы из массива отрисовываем <Pagination.Item>
//Для начала и для проверки сперва просто отрисуем номера страниц из массива
//И теперь когда у нас есть первоначальная визуальная часть, экспортируем этот компонет в Shop.js и отобразим его в самом низу страницы
//Далее перейдем в deviceStore.js и создадим там новые поля/состояния которые нам будут нужны для работы логики по пагинации: this._page, this._totalCount, this._limit
//После чего перейдем в deviceAPI.js, чтобы дописать логику по фетчингу с бекенда нужной нам информации для работы пагинации и дальнейшем ее сохранением в deviceStore.js


import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import {Context} from '../index'
import Pagination from 'react-bootstrap/Pagination';

const Pages = observer( () => {
  const {device} = useContext(Context)
  const pages = [1,2,3,4,5]

  return (
    <Pagination className='mt-5'>
      {pages.map(page => 
        <Pagination.Item>
          {page}
        </Pagination.Item> 
      )}
    </Pagination>
  )
})

export default Pages

// import Pagination from 'react-bootstrap/Pagination';
// import { Context } from '..';

// let active = 2;
// let items = [];
// for (let number = 1; number <= 5; number++) {
//   items.push(
//     <Pagination.Item key={number} active={number === active}>
//       {number}
//     </Pagination.Item>,
//   );
// }

// const paginationBasic = (
//   <div>
//     <Pagination>{items}</Pagination>
//     <br />

//     <Pagination size="lg">{items}</Pagination>
//     <br />

//     <Pagination size="sm">{items}</Pagination>
//   </div>
// );

// render(paginationBasic);