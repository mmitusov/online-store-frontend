# История создания приложения + его описание

Cоздаем задаем стартовую структуру нашему приложению и создади новые папки в src:
    store - для взаимодействия с mobx и хранения каких либо данных
    pages - тут будут находится корнивые компоненты которые будут являтся страницами
    components - для всяких нав-баров и в т.д. Здесь храниятся компоненты которые не имеют собственных ЮРЛ, но при этом используются в коде. Поэтому здесь хранятся любые компоненты кроме самих страниц, которые имею подвязанные к ним ЮРЛ адреса

Также сразу создадим некоторые страницы:
    в папке pages: Auth (страница с авторизацией), Shop (основная страница с карточками, постраничный вывод, список брендов и т.д.), DevicePage (страница конкретного устройства), Admin (здесь админ сможет добавлять типы, бренды и устройства), Basket (страница с корзиной (реализовывать не будем))

Теперь зная какие страницы будут в нашем приложении - мы можем реализовать навигацию по ним. Для этого в папке components создадим AppRouter. В нем будет описана логика навигации по страницам. Какие то страницы доступны всем, какие то - только авторизованным.

Далее в папке src создаем routes.js - где будут описаны все маршруты к конкретным страницам которые есть в нашем приложении. Чтобы не указывать маршруты в виде строки в routes.js - мы создадали папку utils, а в ней файл с константами - consts.js. И от сюда будем уже експортировать нужные нам константы в routes.js

После указания маршрутов в routes.js, мы будем исполользовать их в AppRouter, чтобы сделать их интерактивными.

Настраивая маршруты в AppRouter, стоит заметить что в новой версии "react-router-dom v6" больше не используется компонет "Switch", и его переименовали на "Routes". Со старым лексиконом ничего работать не будет. Также в новой версии убрали необходимость в указании команды "exact": In react router v6, the exact prop has been removed and you can put your routes in whatever order you wish and the router automatically detects the best route for the current URL. Дедали [по ссылке](https://bobbyhadz.com/blog/react-export-switch-imported-as-switch-not-found). Также в новой версии синтаксис Redirect заменили на Navigate.

После всех проделанных выше шагов теперь мы должны иметь возможность переходить по маршрутам страниц нашего магазина. И мы уже можем проверить это в тестовом режиме. Например перейдя по адресу "http://localhost:3000" - у нас будет отображаться страница "Shop", а перейдя по адресу "http://localhost:3000/login" - должна отображатся страница "Auth" и т.д.

Ниже будет описана логика перехода на страницы по указаным нами путями-ссылками, дополнительно с описанием того как это работает:
    1. В App.js мы задействуем елемент BrowserRouter (из 'react-router-dom') который дает нам возможность переключаться между разными компонентами в React. И в BrowserRouter мы ипортируем AppRouter;
    2. AppRouter в свою очередь является подобием логической развилки. Здесь мы можем задавать условия перехода на разные страницы, в зависимости от логики которую мы пропишем. В нашем случае, тут мы отделяем авторизованых пользователей от неавторизованных. Где "element={</>}", хранит в себе ссылку по которой мы можем переходить. P.S. Так как пункт №2 является продолжением логики пердыдущего пункта №1, получается после оборачивания нашего контента в BrowserRouter в прошлом пункте, далее мы дополнительно оборачиваем его в компонет Routes (из 'react-router-dom'). А в Routes дополниельно еще зоварачивааем Route. И в итоге, на данном этапе, у нас получается подобие матрешки из BrowserRouter > Routes > Route. Детальное описание работы такой мотрешки [тут](https://www.w3schools.com/react/react_router.asp);
    3. Пути страниц для AppRouter мы берем из routes.js. routes.js был создан для удобства. Здесь мы разделяем маршруты авторизованных пользоветелей от неавторизованных и помещаем их в разные объекты. Также в этих объектах мы указываем по какому пути-ссылке (path), какая страница-компанент должна отображаться (Component). То есть, в зависимости от того, что у нас написано в строке запроса, то у нас и отображается. И всю эту информацию мы експортируем в AppRouter для обработки. Также стоит заметить, что в routes.js, мы используем переменыые которые хранят в памяти пути-ссылки, вместо использоваеия путей напрямую. Все эти переменные хранятся в файле consts.js (папка utils), откуда мы их и экспортируем. Это было сделанно чисто ради удобства, ведь удобнее использовате переменную в разных частях кода, вместо прописывания полного пути;
    4. После всего вышеописанного, теперь мы можем переходить на интересующие нас страницы по указанным нами ссылкам.

Теперь, мы начнем имплементировать стейт менеджер (mobx), который будет следить за изменением состояния всех наших компонентов и контролировать их. И благодаря этому, мы, например, сможем использовать глобальное хранилище перменных, вместо временной заглушки "const isAuth = false" (из AppRouter). Для этого создадим глобальное хранилище "userStore" в папке "store" и начнем прописывать там логику работы стейт-менеджера.

После прописания логики, далее мы должны осуществить общение всех компонентов с нашим хранилищем. Для этого мы позвязываем наш класс из userStore к самому родительскому компоненту из index.js. Ведь именно он является началом всех дочерних компонентов. И именно из него мы сможем опрокидывать состояния из userStore в наши компоненты. И после подвязки его к index.js, мы будем иметь возможность обращаться за переменной или состоянием из любого компонента сперва к index.js, а он в свою очередь напрямую связан с глобальным хранилищем userStore. А это значит, что теперь у нас есть глобальное хранилище и из любого места нашего приложения мы можем получать из него данные. 

Исходя из той же логике выше, также добавим и второе наше хранилище - DeviceStore. Здесь мы будем хранить информацию о наших брендах и типах товаров.

И в целом на этом карказ нашего приложения готов, поэтому далее мы можем приступать к верстке на Bootstrap.

Начнем мы с Navigation bar. Для этого в папке components создадим файл NavBar. После чего скопируем с сайта react-bootstrap нужный нам код на навбар, а также ссылки на все необходимые для его работы модули. После чего настроим его под наше усмотрение: лигику и стили.

После завершения работы с Navigation bar, мы перейдем к созданию формы авторизации и регестрации. Причем, под эту задачу у нас уже есть созданный ранее компонент Auth.js, где мы и будем создавать нашу форму. При чем сам компонент сделаем универсальным - он будет как под регестрацию так и под авторизацию.

Далее, займемся страницей магазина. Магазин находится у нас в Shop.js. Однако, логику вытягивания перечня типов товаров и их брендов из БД и дальнейший их вывод на фронтенд, мы пропишем в отдельных компонентах TypeBar.js, BrandBar.js и DeviceList.js. После чего, уже будем импортировать эти компоненты непосредственно в Shop.js. TypeBar.js и BrandBar.js выполняют функции фильтров товара, а DeviceList.js ответственный за отображание сетки/списка с товарами на главной странице нашего магазина.

Теперь можно приступить к реализации DevicePage. Это страница, которая при выборее товара из перечня всех товаров в магазине, будет отображать детали о нем, с возможностью добавления этого товара в корзину.

Далее реализуем админ панель. Сперва, чтобы на нее переходить, сделаем так, чтобы при нажатии на кнопку "Админ панель" в навбаре, нас пебрасывало на компонент Admin.js (при условии если роль нашего юзера это админ). Причем нужно не забывать, что в тестовом режиме, "Админ панель" в навбаре будет работать только когда мы укажем роль нашего юзера в userStore.js - как админ. И теперь можем переходит к реализации данного компонента.

Admin.js хранит в себе 3 основных кнопки/функционала: Добавить тип, Добавить бренд, Добавить устройство. При нажатии на каждую из этих кнопок, будет открываться окно для ввода данных. Информация из которых будет далее сохраняться в БД на сервере. И чтобы держать наш код чистым, то логику для отображения и работы модальных окон, мы вынесем как отдельные компоненты в папку components/modals. Описание работы каждого компонента, содержится в самом компоненте.

На этом мы завершаем визуальную верстку сайта и будем приступать к связыванию функционала нашего фронтенда с бекендом. Для этого создадим папку "http" и внутри нее файл "index.js", в котором, при помощи axios, будет реализировано два instance: $host и $authHost (для запросов, что требует авторизации). И далее, в папке http создадим файл userAPI.js, где мы, в свою очередь, реализуем отправку запросов на сервер, при помощи функций регистрации, авторизации и проверки токена на валидность. А данные (логин и пароль), что мы будем отправлять запросом, мы будем выцеплять из Auth.js, после того как пользователь ввел их. Для этого, в Auth.js, реализуем два состояния (для email & password) и функцию click(), которая будет уже передавать данные пользователя далее в Auth.js. P.S. При чем при регестрации в userAPI.js, для удобства, роль "ADMIN" мы будем задавать автоматом абсолютно всем пользователям без исключения. 

Теперь мы можем регестрировать пользователей и получать ответ от сервера, который будет содержать в себе JWT токен этого пользователя. И чтобы получать данные о пользователе из этого токена, воспользуеся npm пакетом - jwt-decode. Не забываем сохранить декодированные данные о пользователе (email, роль, id) в нашем хранилище userStore.js (в стейт менеджере mobx). И учесть вариант когда после ввода пользователя данных, мы можем получить какую-либо ошибку: для этого оборачивает функцию click() из Auth.js, в try-catch блок. А в случае успешной авторизации, в Auth.js, также добавим логику на редирект пользователя со страници авторизации на заглавную страницу магазина.

!!!Описать как работает логика авторизациитот от начсала до конца

Далее реализуем хранение данных полученных с сервера (в нашем случае токена), в браузере пользователя. Для хранения токена на стороне клиентского браузера (после того как мы его получили с бека), для удобства, воспользуемся localStorage. Однако при желании можно было бы воспользоваться и sessionStorage или cookie.
Логика такова: пользователь авторизовался; токен сохраняется в браузере; затем, каждый раз при обновлении страницы, для обновления текущего пользовательского токена и продления его действия, будет вызываться функция check(), что находится в userAPI.js; и если токен не валидный, то пользователь должен будет повторно залогиниться; а если валидный, то пользователь будет попадать на страницу магазина под своим аккаунтом.

Затем в App.js реализуем логику, которая при каждой перезагрузке приложения, через функцию chech() в userAPI.js, выполняла бы запрос на сервер, для проверки пользователя, валидности его токена и потенциального обновления пользовательского токена. Теперь когда мы сразу проверяем пользователя, мы можем корректно отрисовывать навбар в зависимости от того авторизован ли пользователь или нет. И сразу же добавим логику отображения значка загрузки, пока мы ждем ответ от сервера. P.S. В App.js ЛОГИКА РАБОТАЕТ ЕЩЕ НЕ СОВСЕМ ПРАВИЛЬНО

Займемся навбаром. Сейчас при выходе с учетки, нас просто редиректит на панель логина. Исправим это и реализуем нормальную функцию по выходу из учетной записи. Также, заменим логику кнопки "Авторизация". Теперь при нажатии "Авторизация", нас будет переводить на страницу логина/регестрации.

И теперь можем перейти к логике по получению типов, брендов и устройств с бекенда. Ведь изначально, в качестве временного решения, все эти данные мы хардкодили вручную. Для этого в папке HTTP, создадим новый файлик - deviceAPI.js. И в нем пропишем точки доступа к нашему беку, для получения информации по типам, брендам, девайсам. При чем, полученную информацию с бека, мы будем помещать в наше глобальное хранилище deviceStore (mobx). И логикой по получению типов, брендов и устройств в deviceStore, мы воспользуемся в компоненте Shop.js. Ведь как раз таки именно он и отвечает за отображение типов, брендов, девайсов. И все эти типы, бренды, девайсы мы будем единоразово подгружать с сервера при каждом запуске страницы, воспользовавшись useEffect().
P.S. Не забываем, что для работы и отображения типов, брендов и устройств на фронте, теперь мы должны не забывать запускать бекендовскую часть приложения, ведь теперь мы все подхватываем динамически с сервера.

Далее займемся динамическим отображением данных в DevicePage.js, которые мы получили с бекенда. Так как изначально, в качестве временного решения, все эти данные мы хардкодили вручную. Теперь же, мы будем выцеплять id текущего товара из строки запроса и по нему подгружать информацию об этом товаре с бека.

Теперь пришло время оживить нашу админ панель не только на получение, но и на добавление типов, брендов и устройств в БД нашего бекенда, после ее отправки с UI нашего фронтернда. Для этого, в таких файлах как CreateType.js, CreateBrand.js и CreateDevice.js, допишем логику по отправке информации о новых товарах на наш бекенд. И начнем мы с типов товаров. Затем займемся брендами. И потом созданием новых девайсов.

На этом этапе, интернет магазин по сути почти готов. Хоть он и выглядет не очень красиво, но вся основная логика для его работы уже прописана. Однако, остался еще некоторый функционал который мы еще не добавили: постраничная пагинация и фильтрация товаров по выбранному типу и бренду товара.

Начнем с пагинации. Для этого, сперва создадим новый компонент и назовем его Pages.js (папка components). Затем скопируем с react-bootstrap компонент pagination и импортируем его туда. После чего, пропишем всю логику по работе пагинации внутри этого компонента. И после оформления основной визуальной части нашего кампонента (Pages.js), экспортируем его в Shop.js, чтобы он отображался внизу страницы. Далее перейдем в deviceStore.js и создадим там новые поля/состояния которые нам будут нужны для работы логики по пагинации: this._page, this._totalCount, this._limit. Далее, чтобы динамически подсчитавать то, сколько вкладок пагинации нам нужно отображать (не самих страниц, а [1,2, ...]), в зависимости от того сколько нам пришло товаров с бека и в зависимости от того сколько мы можем отобразить на одной такой вкладке пагинации, перейдем в Shop.js. В компонент Shop.js напишем логику fetchDevices(null, null, 1, 3).then(...), чтобы получать ответом с сервера общее кол-во пришедших устройств, сохраняя их далее в mobx: fetchDevices().then(data => {device.setTotalCount(data.count)}. Ответом с сервера, теперь нам будет приходить информации о том, сколько всего товаров мы получили с бека (их общее количество). И теперь зная сколько всего у нас есть товаров, теперь саму логику по подсчету того, сколько должно отображаться товаров на одной странице пагинации, напишем уже в Pages.js: Math.ceil(device.totalCount / device.limit).

Но чтобы созданная фронтендовская логика fetchDevices(null, null, 1, 3).then(...), в Shop.js, могла работать, нам также нужно создать HTTTP логику по передаче запроса на получения девайса с сервера, по конкретным параметрам. И по заданным конкретным параметрам, нам будет приходить соответствующие конкретные виды девайсов, в установленом нами количестве. Для этого переходим в deviceAPI.js, чтобы дописать нужную нам логику - fetchDevices = async (typeId, brandId, page, limit=5). А передавать в нее параметры мы будем из Shop.js - fetchDevices(null, null, 1, 3).then(). И нам будет приходить как количество товаров, в соответствии с лимитом который мы передали в Shop.js, так и товары под конкретным typeId и brandId. Что нам также пригодиться в будущем, при создании логики по получению конкрентного типа и бренда товара с сервера, по его id.

Теперь когда мы разобрались с подсчетом страниц пагинации и логикой по отправке запроса на сервер, остается решить вопрос с подгрузкой конкретного количества устройств, на конкретную страницу пагинации. Так как мы хотим ограничить то, сколько устройств может отображаться на каждой странице пагинации. Получается нам осталось связать работу пагинации и отображения количества подгруженных устройств. То есть, например, при нажатии на страницу пагинации 2, мы будем отправлять новый запрос на сервер по подгрузке следующих на очереди устройств, после чего менять текущие уже отображаемые устройства на новые.

Для этого в Shop.js воспользуемся еще одним хуком useEffect.

# Заметки

'rafce' - snippet

Перечень используемых npm пакетов:
    axios - для отправки запросов на сервер
    react router dom - для постраничной навигации
    mobx - стейт менеджер (по типу Redux)
    mobx lite - чтобы связать mobx с функциональными компонентами реакта
    bootstrap-react - Для работы с bootstrap заходим в в папку public, файл index.html, и вставляем в него код с официального сайта bootstrap
    jwt-decode - пакет который распарсивает (достает информацию) из JWT токенов, чтобы мы могли пользоваться информацией из токена

VS Code расширения:
    ES7+ React/Redux/React-Native snippets – командой “rfce” можно создавать класовый скелет компонентов в React

How to properly clean Create-React-App. -> Delete everything but index.js (initial starting point which later on calls App.js, where we will be implementing our code; don't forget to delete serviceWorker) and App.js (where we write our structure). These are backbone of our React-app so we're leaving them where yhey are. You can also leave indedx.css or App.js untouched. However they are not vital for React-app to work and we can create our own css files later on if we'd want to. Также удалим все лишнее из index.html. В index.html, в <body> будет храниться единственный div. И именно в него будет монтироваться наше приложение (наш корневой компонент App).

Using environment variables in a React application (Using a '.env' file)
When using create-react-app, the variable needs to start with REACT_APP_ otherwise this won’t work, and it’s mostly for security reasons. e.g. 'REACT_APP_MY_ENV=Some value'
