//Связываем наш фронтенд и бекенд
//Сдесь при помощи axios, будет реализировано два instance: $host и $authHost (для запросов, что требует авторизации)
//Создадим два instence. 1й ($host) для обычных запросов, которые не требуют авторизации
//А во 2й instence ($authHost), к какждому запросу мы будем автоматически подставлять хедер Authorization, и в этот хедер будет добавляться JWT token
//В опциях мы можем указать URL на который будут отправляться запросы (при помощи  baseURL: '')
//baseURL: '' - один из параметров конфигурации запросов в axios (`baseURL` будет добавляться `url`, если `url` не является абсолютным)
//Хардкодить URL мы его не будем, а создадим для этого файл .env, и в нем как системную переменную укажем api к серверу (переменную по которой мы к нему подключаемся): REACT_APP_API_URL
//Пока мы еще не выгрузили наш бек на сервер и к нему отсутствует ссылка, то для нас REACT_APP_API_URL в .env, будет = 'http://localhost:3002/'
//Проверив работоспособность .env файла и его переменных, передаем в baseURL нашу системную переменную 'process.env.REACT_APP_API_URL'

//В случае второго instence, мы должны авоматически подставлять JWT token к каждому запросу. И для этого существуют так называемые Интерсепторы (Interсeptor)
//Interseptors - это просто функции, которые параметром принимают config
//Здесь в authInterсeptor, в config, в поле config.headers, добавляем headers.authorization (interceptors.request - это из axios)
//И указываем наш токен, который получать мы будем из локального хранилища по ключу token - localStorage.getItem('token')
//А добавляться в локальное хранилище этот token будет при авторизации, и потом мы сможем его оттуда получать
//Затем для instence "$authHost", добавляем Interсeptor именно для запроса (interceptors.request - берем из axios). Хотя при желании, можно было бы повесть Interсeptor и для ответа, а не только запроса. Но мы вешаем пока только на запрос
//Таким образом, наш Interсeptor будет отрабатывать пред каждым запросом, и подставлять JWT токен в headers.authorization. Также как когда мы тестировали наш токен вручную в Postman, когда писали и тестили бек
//Далее в папке http создадим файл userAUTH.js, где мы реализуем функции регистрации, авторизации и проверки токена на валидность

import axios from "axios";
 
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterсeptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}` //!!!Нужно разобраться как это работает???
    return config
}

$authHost.interceptors.request.use(authInterсeptor)

export {
    $host,
    $authHost
};