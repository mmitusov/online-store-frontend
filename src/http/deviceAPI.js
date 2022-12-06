//В userAUTH.js реализированы функции по сознанию типов, брендов и устройств на бекенде, через наш UI на фронтернде
//Логика работы компонента будет по большей части идентична userAPI.js
//Сперва займемся типами товаров
//Создаем createType и fetchTypes, для создания нового типа и получения уже существующих типов на бекенде
//createType: Передаем параметром type, по адрессу api/type. И в теле запроса будем передавать тип из параметра - ('api/type', type)
//И так как для создания типа нам нужно проверить авторизован ли пользователь (должен быть админом), то мы используем $authHost
//На беке по адрессу api/type у нас как раз таки создан middleware для проверки роли пользоваиеля. И нам нужем именно авторизованных хост ($authHost), так как роль проверяется именно по токену
//fetchTypes: Параметром ничего не принимает и поэтому в тело запроса также ничего не передаем. Адресс url: api/type.
//В fetchTypes достаточно обыного хоста ($host), так как любой из пользователей имеет доступ к получению списка типов
//И протестируем написаную логику по получению типов товара в компоненте Shop.js

//Далее займемся брендами товаров. По аналогии создадим createBrand и fetchBrands

//И тоже самое делаем и для девайсов: createDevice, fetchDevices
//Но ниже мы также добавляем и функцию fetchOneDevice - для получения одного, конкретного девайса
//Параметром эта функция будет принимать id товара который мы ищем. И этот id передаем как часть строки запроса: ('api/device/' + id)

//Ближе к концу разработки, для работы логики по пагинации, модифицируем нашу функцию запроса fetchDevices()
//В эту функцию, параметрами мы теперь будем передавать: id типа товара, id бренда, номер страницы и лимит отображения девайсов на странице (по умолчанию сделаем лимит = 5)
//Затем, в опциях, мы можем эти параметры указать, для дальнейшей отправки их на бек - .get('api/brand', {params: { ..., ... etc. }})
//Напомню, что id типа и id бренда передаются, чтобы получить конкретные/нужные товары с бека по заданому типу и бренду, если нам это понадобиться
//Изначально, в Shop.js, id типа и id бренда задаются как null, чтобы мы подтягивали абсолютно все товары, в независимоти от типа и бренда - fetchDevices(null, null, 1, 3)
//Но при желании, мы можем заменять эти id на то что нам нужно, получая при этом коннкретную группу товаров
//То есть, например, мы нажали на холодильники, передали их id-шники и к нам подгрузились все имеющееся холодильники
//Далее, в Shop.js нам нужно написать логику по сохранению информации о том сколько всего товаров мы получили с бека - device.setTotalCount(data.count)
//Это нам нужно для того, чтобы потом подсчитать кол-во товаров которое мы хотим отобразить на ка каждой странице пагинации
//А саму логику по подсчету кол-ва товров, напишем уже в Pages.js - const pageCount = Math.ceil(device.totalCount / device.limit)

import {$host, $authHost} from './index'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
} 
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}


export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
} 
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}


export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
} 
export const fetchDevices = async (typeId, brandId, page, limit=5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit
    }})
    return data
}
export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}