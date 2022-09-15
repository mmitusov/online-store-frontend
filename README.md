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

После указания маршрутов в routes.js, мы будем исполользовать их в AppRouter, чтобы сделать их интерактивными.

Настраивая маршруты в AppRouter, стоит заметить что в новой версии "react-router-dom v6" больше не используется компонет "Switch", и его переименовали на "Routes". Со старым лексиконом ничего работать не будет. Также в новой версии убрали необходимость в указании команды "exact": In react router v6, the exact prop has been removed and you can put your routes in whatever order you wish and the router automatically detects the best route for the current URL. Дедали [по ссылке](https://bobbyhadz.com/blog/react-export-switch-imported-as-switch-not-found).

После всех проделанных выше шагов теперь мы должны иметь возможность переходить по маршрутам страниц нашего магазина. И мы уже можем проверить это в тестовом режиме. Например перейдя по адресу "http://localhost:3000" - у нас будет отображаться страница "Shop", а перейдя по адресу "http://localhost:3000/login" - должна отображатся страница "Auth" и т.д. 

Ниже будет описана логика перехода на данныйе адреса страниц, дополнительно с описанием того как это работает:
    1. В App.js мы задействуем елемент BrowserRouter (из 'react-router-dom') который дает нам возможность переключаться между разными компонентами в React. И в BrowserRouter мы ипортируем AppRouter;
    2. AppRouter в свою очередь является подобием логической развилки. Здесь мы можем задавать условия перехода на разные страницы, в зависимости от логики которую мы пропишем. В нашем случае, тут мы отделяем авторизованых пользователей от неавторизованных. Где "element={</>}", хранит в себе ссылку по которой мы можем переходить. P.S. Так как пункт №2 является продолжением логики пердыдущего пункта №1, получается после оборачивания нашего контента в BrowserRouter в прошлом пункте, далее мы дополнительно оборачиваем его в компонет Routes (из 'react-router-dom'). А в Routes дополниельно еще зоварачивааем Route. И в итоге, на данном этапе, у нас получается подобие матрешки из BrowserRouter > Routes > Route. Детальное описание работы такой мотрешки [тут](https://www.w3schools.com/react/react_router.asp);
    3.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
