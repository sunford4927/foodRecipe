import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { BrowserRouter } from 'react-router-dom';

// Redux 관련 불러오기
// import { createStore } from 'redux';
// import counter from "./redux/reducer/index.ts"
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './redux/reducer/index.ts';
import { Provider } from 'react-redux';
import './index.scss'

// const store = createStore(counter);
const store = configureStore({
    reducer: counterReducer,
});


// 설치 완료 리스트
// npm i react-router-dom 
// npm i axios
// npm install concurrently --save : 서버와 클라이언트를 한번에 실행시키기위한 라이브러리
// npm i redux
// npm i react-redux
// npm i sass
// npm i react-paginate
// npm i react-icons
// npm i firebase : 본인 인증 관련 설치
// npm i http-proxy-middleware
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    //<React.StrictMode>
    
    <Provider store={store} >
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        {/* <BrowserRouter basename='/foodRecipe'> */}
            <App />
        </BrowserRouter>
    </Provider>
    //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

