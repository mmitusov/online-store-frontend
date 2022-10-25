//В userAUTH.js реализированы функции регистрации, авторизации и проверки токена на валидность. Та самая функция check() из бекенда
//Сперва импортируем {$host, $authHost} из ./index (папка http). И сразу экспортируем функцию, которую мы будем создавать и зделаем ее асинхронной
//В переменную response будем помещать ответ, который будет возвращаться от сервера. И это будет у нас пост запрос. 
//Базовый URL у нас береться из системной переменной. И к нему добавляем еще 'api/auth/registration' - ендпоинты которые мы указывали на сервере
//Как тело запроса, мы передаем объект с email, password и пока роль сделаем админом (role:'ADMIN'), чтобы не было проблем с доступом
//И этот response из этой функции будем возвращать
//И сразу продублируем логику registration. Она будет такой же и для логина (login()) и проверки токена (check()). Только подправим в них URL
//Единственно функция check, параметром ничего принимать не будет. А из login уберем 'role:'ADMIN''
//И теперь эти функции проверим и воспользуемся ими

import {$host, $authHost} from './index'

export const registration = async (email, password) => {
    const response = await $host.post('api/auth/registration', {email, password, role:'ADMIN'})
    return response
}

export const login = async (email, password) => {
    const response = await $host.post('api/auth/login', {email, password})
    return response
}

export const check = async () => {
    const response = await $host.post('api/auth/registration', {email, password, role:'ADMIN'})
    return response
}