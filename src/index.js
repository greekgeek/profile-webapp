import React from 'react';
import {
  Provider
} from 'react-redux';
import store from '@@/store/store';
import ReactDOM from 'react-dom';
import './index.scss';
import './scss/_global.scss';
import 'antd/dist/antd.css';
import AppRouter from './Router/Router';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
