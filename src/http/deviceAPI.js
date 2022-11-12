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

//Далее займемся брендами товаров

import {$host, $authHost} from './index'

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
} 

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}