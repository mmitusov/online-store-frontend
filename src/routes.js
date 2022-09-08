//authRoutes будет содержать в себе только список тех страниц к которым имеет доступ только авторизованные пользователь
//у каждого объекта будет path - ссылка по которой указаная страница будет отрабатывать. И Component - это уже непосредственно сама страница
//Например, по url '/admin' будет вызываться компонет админа
//Стоит заметить, что в виде строки указывать маршрут является не очень хорошей практикой. Так как при большом количестве страниц и/или подстраниц - будет путаница
//Поэтому, чтобы этого избежать, мы создадим папку utils и в ней файл с константами - consts.js. И от сюда будем уже експортировать константы
//В дальнейшем мы эти константы сможем експортировать и использовать в нужных местах, не боясь ошибиться в том или ином маршруте

//После описания маршрутов, чтобы их "оживить". Для этого в AppRouter возвращаем компонент Switch
//Switch работает следующим образом: если указаные в нем маршруты не работают или пользователь ввел неправильный адресс - то отработает самый последний маршрут что указан в Switch
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import Shop from './pages/Shop'
import DevicePage from './pages/DevicePage'
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

//authRoutes будет содержать в себе только список тех страниц к которым имеет доступ любой льзователь
export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id', //Но при просмотре конкретного устройства в url добавим также и /:id конкретного устройства, чтобы мы могли делать запрос на сервер и это устройство получать
        Component: DevicePage
    }
]