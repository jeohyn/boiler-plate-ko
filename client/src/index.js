import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import 'antd/dist/antd.css'
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleWare from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './_reducers'

const createStoreWithMiddleware=applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore)

//보여주고싶은 컴포넌트 넣는 곳. root:index.html 안의 root아이디를 가지는 부분
ReactDOM.render(
  //connect redux and add extension
<Provider
  store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__&&
    window.__REDUX_DEVTOOLS_EXTENSION__())}>
  <App /></Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
