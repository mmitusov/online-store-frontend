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
