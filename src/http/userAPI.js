//В userAUTH.js реализированы функции регистрации, авторизации и проверки токена на валидность (та самая функция check() из бекенда).
//Сперва импортируем {$host, $authHost} из ./index (папка http). И сразу экспортируем функцию, которую мы будем создавать и зделаем ее асинхронной
//В переменную response будем помещать ответ, который будет возвращаться от сервера. И это будет у нас пост запрос. 
//Базовый URL у нас береться из системной переменной. И к нему добавляем еще 'api/user/registration' - ендпоинты которые мы указывали на сервере
//Как тело запроса, мы передаем объект с email, password и пока роль сделаем админом (role:'ADMIN'), чтобы не было проблем с доступом
//И этот response из этой функции будем возвращать
//И сразу продублируем логику registration. Она будет такой же и для логина (login()) и проверки токена (check()). Только подправим в них URL
//Единственно функция check, параметром ничего принимать не будет. А из login уберем 'role:'ADMIN'' (для логина нам не нужен этот парааметр)

//И теперь эти функции проверим и воспользуемся ими
//Для этого, откроем страницу с авторизацией - Auth.js. И создадим в ней новую функцию signIn()
//И после реализации signIn(), будет возможно отправлять данные пользователя на сервер и в получать в теле ответа сгенерированный на сервере JWT токен
//И теперь этот токен мы можем сохранять в локальное хранилище, и пользоватеьл будет авторизован
//Но также нам нужно будет дополнительно сохранять информацию о пользователе (из JWT токена), чтобв, например отрисовывать ее на странице профиля нашего пользователя
//Для этого, дополнительно установим и воспользуемся библиотекой "jwt-decode" - которая распарсивает (достает информацию) из JWT токенов, чтобы мы могли ею пользоваться
//Переменную которая будет принимать response, можно сразу деструктуризировать ({data} - это уже выцепелнный токен), чтобы было более удобно распарсить токен
//А возвращать из функции мы будем уже результат декодированого токена - jwt_decode(data). Терепь при регестрации, мы можем вывести в логи объект, с информацией о юзере
//И после внедрения логики авторизации и получения токена в Auth.js, теперь добавим в userAPI.js логику по хранению нашего полученого с бека JWT токена (ведь нам его нужно сохранить, чтобы в дальнейшем его использовать)
//Для хранения токена на стороне браузера клиента, воспользуемся localStorage. Однако при желании можно было бы воспользоваться и sessionStorage или cookie
//Для этого, после того как мы получили и сохранили данные с бекенда в {data}, мы будем помещать в локальное хранилище токен из тела запроса "data.token", по ключу 'token' - localStorage.setItem('token', data.token)

//Далее разберемся с функцией check, которая будет делать запрос на на бек на обновление текущего токена и как результат возвращать нам обновленный токен
//Тут нам понадобится $authHost, так как здесь, к запросу на бек, мы уже будет прикреплять текущий токен. Напомню, что на беке по /auth, мы создали middleware который этот токен будет проверять
//После получения обновленного токена, мы перезаписываем текущий (localStorage.setItem('token', data.token)) и из перезаписаного токена опять возвращаем данные о пользователе. Функция check готова
//Далее перейдем в компонент App.js

//!!!!!P.S.!!!!!! При логине и регистрации, наш деструктуризированный data сразу содержит токен. А вот data из check(), возвращает объект, в котором токен храниться под ключом data.token
//И если это не учесть, то мы не сожем нормально ни обновлять, ни сохранять токен. И также это значит, что сервер также не будет способен воспользоваться токеном и будет выдавать ошибки

import {$host, $authHost} from './index'
import jwt_decode from 'jwt-decode'

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data)    
    return jwt_decode(data)
} 

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data)    
    return jwt_decode(data)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')    
    localStorage.setItem('token', data.token)    
    return jwt_decode(data.token)
}