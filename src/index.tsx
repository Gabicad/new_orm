import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'storeon/react';
import CustomSnackbar from './libraries/CustomSnackBar';
import { AppStore } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={AppStore}>
      <BrowserRouter>
        <CustomSnackbar />
        <App />
      </BrowserRouter>
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
