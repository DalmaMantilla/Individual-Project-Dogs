import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//-------------------------------------------------
import { Provider } from 'react-redux'; // traigo p/ envolver todo el index (<React.StrictMode> y todo su contenido) en un componente Provider para que ridux lo reconozca.
import { store } from '../src/redux/store';
import { BrowserRouter } from 'react-router-dom';
// import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();


// axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

 
   
   
  
