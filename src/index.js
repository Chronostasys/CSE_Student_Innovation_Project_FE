import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import axios from 'axios';

// axios.defaults.baseURL = 'https://xxxxx';

axios.interceptors.request.use(request => {
  console.log(request);
  if (request.headers) {
    request.headers.token = localStorage.getItem('token')
  } else {
    request.headers = {
      token: localStorage.getItem('token'),
    }
  }
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(<Router><App/></Router>, document.querySelector('#root'));