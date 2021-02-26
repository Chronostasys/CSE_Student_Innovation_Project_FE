import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import './index.css';
import LoadBasicTextFields from './loadpage/LoadBasicTextFields';
import Home from './Home';


import { red } from '@material-ui/core/colors';

/****************************index background*******************************/
function IndexBackground() {
  return (
    <div>
      <div className="loadHeaderLogo" />
      <div className="wanganLogo" />
      <div className="loadbackLine1">
        <div className="loadbackLine11"></div><div className="loadbackLine12"></div>
        <div className="loadbackLine13"></div><div className="loadbackLine14"></div>
      </div>
      <div className="loadbackLine2">
        <div className="loadbackLine21"></div><div className="loadbackLine22"></div>
      </div>
    </div>
  );
}
/****************************useStyles*******************************/

export default function App() {
  return (
    
    <Router>
    <div>
      <Switch>
        <Route path="/load"><LoadBasicTextFields /><IndexBackground /></Route>
        <Route path="/home"><Home /></Route>
        <Route exact path="/"></Route>

      </Switch>

    </div>
    </Router>
  );
}


