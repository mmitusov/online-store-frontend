//Здесь мы начнем внедрять логику опрокидывания состояний mobx (из UserStore) в наши компоненты
//Для этого воспользуемся контекстом реакта и обернем все наше приложениее (самый первичный родительский компонент) в него - "<Context.Provider>"
//И в пропсах Context.Provider создадим новый объект класа UserStore. UserStore - это наш mobx (глобальное хранилище состояний)
//И теперь мы можем напрямую обмениватся состояниями из UserStore, со всеми дочерними компонентами нашего приложения. Просто ссылаясь на наш Context
//Исходя той же логике добавим и второе наше хранилище - DeviceStore

import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import UserStore from './store/userStore';
import DeviceStore from './store/deviceStore';
import './index.css';
import App from './App';

export const Context = createContext(null);
console.log(process.env.REACT_APP_API_URL)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
    }}>
        <App />
    </Context.Provider>
);
