import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {configure} from "axios-hooks";
import axios from './config/Axios.config';
import {Provider} from 'react-redux'
import { createStore} from 'redux';
import combinedReducer from "./appStore/index"
import persistStore, { persisited }  from './appStore/store.js'
import { PersistGate } from 'redux-persist/integration/react'

const store = createStore(combinedReducer)
const persistStor = persistStore(store)
configure({axios})

ReactDOM.render(
  <Provider store={store}>
    
      <React.StrictMode>
        <App />
      </React.StrictMode>
    
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
