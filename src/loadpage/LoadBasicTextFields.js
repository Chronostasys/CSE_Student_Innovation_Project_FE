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
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';

import '../index.css';
import RegisterPage from '../loadpage/Register';
import ForgeKeyword from '../loadpage/ForgetKeyword';
import qs from 'qs';


import { red } from '@material-ui/core/colors';


/****************************load email keyword*******************************/

class LoadBasicTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoadClick = this.handleLoadClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.state = {      
      theEmail: '', 
      EmailJudge: 'T',
      Keyword: '', 
      KeywordJudge: 'T',
    };
  }
  handleEmailChange(e) {
    this.props.handleNameChange(e.target.value);
  }
  handleKeywordChange(e) {
    this.props.handleKeywordChange(e.target.value);
  }
  handleLoadClick() {
    const putEmail = this.state.theEmail;
    const Keyword = this.state.Keyword;
    let LoadClickChange = true;
    if ( putEmail ) {
      this.setState({EmailJudge: 'T'});
    } else {
      this.setState({EmailJudge: 'F'});
      LoadClickChange = false;
    }
    if ( Keyword ) {
      this.setState({KeywordJudge: 'T'});
    } else {
      this.setState({KeywordJudge: 'F'});
      LoadClickChange = false;
    }
    if ( LoadClickChange ) {
      axios({
        method: 'post',
        url: 'http://101.200.227.216:8080/api/auth/login',
        data: qs.stringify({
          email: `${putEmail}`,
          password: `${Keyword}`,
        })
      })
      .then((response) => {
        this.props.history.push("/Home/HomePage");    
        console.log(response);
        console.log(1);
      })
      .catch((error) => {
        this.props.history.push("/Load/false");
        console.log(error);
        console.log(2);
      });;
    }
  }
  handleEmailChange(e) {
    const Email = e.target.value;
    this.setState({theEmail: Email});
  }
  handleKeywordChange(e) {
    const theKeyword = e.target.value;
    this.setState({Keyword: theKeyword});
  }
  render() {
    const EmailJudge = this.state.EmailJudge;
    const KeywordJudge = this.state.KeywordJudge;
    let TextFieldLoadEmail,TextFieldLoadKeyword;
    if (EmailJudge == 'T') {
      TextFieldLoadEmail = <TextField id="load-email" label="邮箱" helperText="" onChange={this.handleEmailChange}/>
    } else if (EmailJudge == 'F'){
      TextFieldLoadEmail = <TextField error id="load-email-error" label="邮箱" helperText="账号不存在或密码错误" onChange={this.handleEmailChange} />      
    }
    if (KeywordJudge == 'T') {
      TextFieldLoadKeyword = <TextField width="250px" id="load-keyword" label="密码" type="password" autoComplete="current-password" onChange={this.handleKeywordChange}/>
    } else if (KeywordJudge == 'F'){
      TextFieldLoadKeyword = <TextField error id="load-keyword-error" label="密码" helperText="账号不存在或密码错误" onChange={this.handleKeywordChange} />      
    }
  return (
    <div>
        <div className="loadBoxAll">
        <div className="loadBoxHeader">登录</div>
        <div id="TextFieldLoadEmail">{TextFieldLoadEmail}</div>
        <div id="TextFieldLoadKeyword">{TextFieldLoadKeyword}</div>
        <Box color="white" bgcolor="#6E99CB" width="137px" height="36px" top="290px" left="250px" clone>
          <Button variant="contained" color="primary"  href="#contained-buttons" onClick={this.handleLoadClick}>登录</Button>
        </Box>
          <Link to="/Load/forgeKeyword" id="forgeKeywordLink">忘记密码</Link>
          <Link to="/Load/register" id="registerLink">免费注册</Link>
        </div>      
      <Switch>
        <Route path="/Load/register">
          <RegisterPage />
        </Route>
        <Route path="/Load/forgeKeyword">
          <ForgeKeyword />
        </Route>
        <Route exact path="/Load/false">
          <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
            <div id="BackKeywordBox1Header">邮箱或密码错误，请重新登录</div>
            <div onClick={ () => this.props.history.go(-1) }> 
              <Loadregisterfalse/>     
            </div>
          </div>
        </Route>
        <Route exact path="/"></Route>
      </Switch>
    </div>
  );
}}
const LoadregisterfalseuseStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    color: theme.palette.text.primary,
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  button: {
    margin: theme.spacing(1),
  },
}));


export function Loadregisterfalse() {
  const classes = LoadregisterfalseuseStyles();
    return (
      <div style={{position:"relative",top:'160px',left:'330px'}}>
        <Button 
          variant="contained"
          className={classes.button}
        >
          返回
        </Button>
      </div>
    );
}


export default withRouter(LoadBasicTextFields);
