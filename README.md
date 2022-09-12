# Getting Started with Create React App

Перечень используемых пакетов:
    axios - для отправки запросов на сервер
    react router dom - для постраничной навигации
    mobx - стейт менеджер
    mobx lite - чтобы связать mobx с функциональными компонентами реакта
    bootstrap-react - Для работы с bootstrap заходим в в папку public, файл index.html, и вставляем в него код с официального сайта bootstrap

Fireship sugesstion: Delete everything but index.js (initial starting point which later on calls App.js, where we will be implementing our code; don't forget to delete serviceWorker) and App.js (where we write our structure). These are backbone of our React-app so we're leaving them where yhey are. You can also leave indedx.css or App.js untouched. However they are not vital for React-app to work and we can create our own css files later on if we'd want so.

Cоздаем задаем стартовую структуру нашему приложению и создади новые папки в src:
    store - для взаимодействия с mobx и хранения каких либо данных
    pages - тут будут находится корнивые компоненты которые будут являтся страницами
    components - для всяких нав-баров и в т.д.

Также сразу создадим некоторые страницы:
    в папке pages: Auth (страница с авторизацией), Shop (основная страница с карточками, постраничный вывод, список брендов и т.д.), DevicePage (страница конкретного устройства), Admin (здесь админ сможет добавлять типы, бренды и устройства), Basket (страница с корзиной (реализовывать не будем/как домашка))

Теперь зная какие страницы будут в нашем приложении - мы можем реализовать навигацию по ним. Для этого в папке components создадим AppRouter. В нем будет описана логика навигации по страницам. Какие то страницы доступны всем, какие то - только авторизованным.

Далее в папке src создаем routes.js - где будут описаны все маршруты к конкретным страницам которые есть в нашем приложении. Чтобы не указывать маршруты в виде строки в routes.js - мы создадали папку utils, а в ней файл с константами - consts.js. И от сюда будем уже експортировать нужные нам константы в routes.js

После указания маршрутов в routes.js, мы писпользуем их в AppRouter, чтобы сделать их интерактивными


//И поскольку мы пробегаемся по массиву - не забываем указывать ключ (object key:value pair). Ключом будет путь, так как каждый путь уникальный
import { Routes, Route, Redirect } from 'react-router-dom';

In react router v6, the exact prop has been removed and you can put your routes in whatever order you wish and the router automatically detects the best route for the current URL - 
https://bobbyhadz.com/blog/react-export-switch-imported-as-switch-not-found
https://www.moreonfew.com/attempted-import-error-switch-is-not-exported-from-react-router-dom/

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
