import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Apps from './Apps';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './context/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Store.Provider value={{usersArr:[],socket:null,userData:{}}}>
    <BrowserRouter>
        <Apps />
        </BrowserRouter>
     </Store.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
