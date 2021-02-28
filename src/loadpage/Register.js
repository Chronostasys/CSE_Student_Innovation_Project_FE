import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  NavLink,
  Redirect,
  useRouteMatch,
  useLocation,
  useParams
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
import qs from 'qs';

import '../index.css';
import { red } from '@material-ui/core/colors';
import { ThreeSixty } from '@material-ui/icons';
import { ButtonGroup } from '@material-ui/core';



/****************************useStyles*******************************/
const useStyles = makeStyles((theme) => ({
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


/**************************** backdrop *******************************/
export function SimpleBackdrop() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

/**************************** RegisterPage *******************************/
class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegisterPageFinishClickChange = this.handleRegisterPageFinishClickChange.bind(this);
    this.RegisterpostVerificationCode = this.RegisterpostVerificationCode.bind(this);
    this.RegisterpostVerificationCodeBoxClick = this.RegisterpostVerificationCodeBoxClick.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onVerificationCodeChange = this.onVerificationCodeChange.bind(this);
    this.onKeywordChange1 = this.onKeywordChange1.bind(this);
    this.onKeywordChange2 = this.onKeywordChange2.bind(this);
    this.state = {
      RegisterPageStage: 1, 
      userName: '',
      userNameJudge: 'T',
      theEmail: '', 
      EmailJudge: 'T',
      VerificationCode: '', 
      VerificationCodeJudge: 'T',
      NewKeyword1: '', 
      NewKeyword2: '', 
      NewKeywordJudge1: 'T',
      NewKeywordJudge2: 'T',
      postVerificationCodeTime: 0,
      };
  }
  RegisterpostVerificationCodeBoxClick(){
    const putEmail = this.state.theEmail;
    if ( putEmail.match(".+@.+(\\..{2,3})*\\..{2,3}") ) {
      this.setState({EmailJudge: 'T'});
      this.RegisterpostVerificationCode();
    } else {
      this.setState({EmailJudge: 'F'});
    }
  }

  RegisterpostVerificationCode() {
    const RegisterpostVerificationCodeEmail = this.state.theEmail;
    console.log(RegisterpostVerificationCodeEmail);
    axios({
      method: 'post',
      url: 'http://101.200.227.216:8080/api/auth/sendVerifyCode',
      data:  qs.stringify({
        email:`${RegisterpostVerificationCodeEmail}`,
      })
    })
    .then((response) => {
      this.setState({EmailJudge: 'T'});
      console.log(response);
    })
    .catch((error) => {
      this.setState({EmailJudge: 'F'});
    });
    
    this.setState({postVerificationCodeTime: 60});
      let lastTime = 60;
      let timer = null;
      timer = setInterval(() => {
        lastTime--;
        if (lastTime == 0) {
          this.setState({postVerificationCodeTime: 0});
          clearInterval(timer);
        }
      }, 1000);
  }
  handleRegisterPageFinishClickChange() {
    const userName = this.state.userName;
    const putEmail = this.state.theEmail;
    const putVerificationCode = this.state.VerificationCode;
    const NewKeyword1 = this.state.NewKeyword1;
    const NewKeyword2 = this.state.NewKeyword2;
    const VerificationCodeJudge = this.state.VerificationCodeJudge;
    let RegisterPageFinishClickChange = true;
    if ( userName.match("^[a-zA-Z0-9_]{4,16}$") ) {
      this.setState({userNameJudge: 'T'});
    } else {
      this.setState({userNameJudge: 'F'});
      RegisterPageFinishClickChange = false;
      
    }
    if ( putEmail.match(".+@.+(\\..{2,3})*\\..{2,3}") ) {
      this.setState({EmailJudge: 'T'});
    } else {
      this.setState({EmailJudge: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if ( VerificationCodeJudge == 'T' ) {
      ;
    } else {
      RegisterPageFinishClickChange = false;
    }
    if (NewKeyword1.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$") ) {
      this.setState({NewKeywordJudge1: 'T'});
    } else {
      this.setState({NewKeywordJudge1: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if ( NewKeyword1 == NewKeyword2 ) {
      this.setState({NewKeywordJudge2: 'T'});
    } else {
      this.setState({NewKeywordJudge2: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if (RegisterPageFinishClickChange) {
      axios({
        method: 'post',
        url: 'http://101.200.227.216:8080/api/auth/signup',
        data:  qs.stringify({
          email: `${putEmail}`,
          password: `${NewKeyword1}`,
          verify_code: `${putVerificationCode}`,
          name: `${userName}`,
        })
      })
      .then((response) => {
        this.props.history.push("/load/register/access");  
        console.log(response);  
        console.log(1);
      })
      .catch((error) => {
        if(error.response.data.msg == "该用户已经注册"){
          this.props.history.push("/load/register/emailfalse"); 
        }else if(error.response.data.msg == "验证码错误，请重新输入或者获取"){
          this.props.history.push("/load/register/codefalse"); 
        }
        console.log(error.response.data.msg);   
        console.log();
      });
    }
  }
  
  onUserNameChange(e) {
    const getUserName = e.target.value;
    this.setState({userName: getUserName});
  }
  onEmailChange(e) {
    const emailaddress = e.target.value;
    this.setState({theEmail: emailaddress});
  }
  onVerificationCodeChange(e) {
    const theVerificationCodeaddress = e.target.value;
    this.setState({VerificationCode: theVerificationCodeaddress});
  }
  onKeywordChange1(e) {
    const keyword1 = e.target.value;
    this.setState({NewKeyword1: keyword1});
  }
  onKeywordChange2(e) {
    const keyword2 = e.target.value;
    this.setState({NewKeyword2: keyword2});
  }
  render() {
    const RegisterPageStage = this.state.RegisterPageStage;
    const userNamejudge = this.state.userNameJudge;
    const Emailjudge = this.state.EmailJudge;
    const VerificationCodejudge = this.state.VerificationCodeJudge;
    const NewKeywordJudge1 = this.state.NewKeywordJudge1;
    const NewKeywordJudge2 = this.state.NewKeywordJudge2;
    let TextFieldRegisterBoxUserName,TextFieldRegisterBoxEmail,TextFieldRegisterBoxVerificationCode,TextFieldRegisterBoxKeyword1,TextFieldRegisterBoxKeyword2,RegisterPageFinishBackBotton,RegistergetVerificationCodeLink;

    if (this.state.postVerificationCodeTime == 0) {
      RegistergetVerificationCodeLink = 
      <a 
        className="RegistergetVerificationCodeLinkT" 
        onClick={this.RegisterpostVerificationCodeBoxClick} 
      >
        发送验证码
      </a>
    } else {
      RegistergetVerificationCodeLink = <a className="RegistergetVerificationCodeLinkF">60s后重新获取</a>
    }

  
    if (userNamejudge == 'T') {
      TextFieldRegisterBoxUserName = <TextField label="用户名" onChange={this.onUserNameChange}/>
    } else if (userNamejudge == 'F'){
      TextFieldRegisterBoxUserName = <TextField error id="standard-error-helper-text" label="用户名" helperText="用户名不可用" onChange={this.onUserNameChange} />      
    }
    if (Emailjudge == 'T') {
      TextFieldRegisterBoxEmail = <TextField label="邮箱" onChange={this.onEmailChange}/>
    } else if (Emailjudge == 'F') {
      TextFieldRegisterBoxEmail = <TextField error id="standard-error-helper-text" label="邮箱" helperText="邮箱已注册或格式不正确" onChange={this.onEmailChange} />      
    }
    if (VerificationCodejudge == 'T') {
      TextFieldRegisterBoxVerificationCode = <TextField label="验证码" onChange={this.onVerificationCodeChange}/>
    } else if (VerificationCodejudge == 'F') {
      TextFieldRegisterBoxVerificationCode = <TextField error id="standard-error-helper-text" label="验证码" helperText="验证码错误" onChange={this.onVerificationCodeChange} />      
    }
    if (NewKeywordJudge1 == 'T') {
      TextFieldRegisterBoxKeyword1 = <TextField type="password" label="密码" onChange={this.onKeywordChange1}/>
    } else if (NewKeywordJudge1 == 'F') {
      TextFieldRegisterBoxKeyword1 = <TextField error id="standard-error-helper-text" type="password" label="密码" helperText="密码必须由8-16位数字加字符组成" onChange={this.onKeywordChange1} />      
    }
    if (NewKeywordJudge2 == 'T') {
      TextFieldRegisterBoxKeyword2 = <TextField type="password" label="密码" onChange={this.onKeywordChange2}/>
    } else if (NewKeywordJudge2 == 'F') {
      TextFieldRegisterBoxKeyword2 = <TextField error id="standard-error-helper-text" type="password" label="密码" helperText="两次输入密码不一致" onChange={this.onKeywordChange2} />      
    }

    return (
      
      <div>

        <SimpleBackdrop />
        
          <div id="RegisterBox" style={{zIndex:"1500"}}>
            <div id="RegisterBoxHeader">欢迎注册</div>
            <div id="RegisterBoxHeadText">已有账户？</div>
            <Link to={"/load"} id="RegisterBoxLoadLink">点击登录</Link>
            <div id="TextFieldRegisterBoxUserNameBox">{TextFieldRegisterBoxUserName}</div>
            <div id="TextFieldRegisterBoxEmailBox">{TextFieldRegisterBoxEmail}</div>
            <div id="TextFieldRegisterBoxVerificationCodeBox">{TextFieldRegisterBoxVerificationCode}</div>
            <div id="TextFieldRegisterBoxKeywordBox1">{TextFieldRegisterBoxKeyword1}</div>
            <div id="TextFieldRegisterBoxKeywordBox2">{TextFieldRegisterBoxKeyword2}</div>
            <div onClick={this.handleRegisterPageFinishClickChange}><RegisterBoxButton /></div>
            <div id="RegisterBoxText1">4-16位数字、字母或下划线组成，用于论坛内显示，后期可修改</div>
            <div id="RegisterBoxText2">登陆时使用</div>
            <div id="RegisterBoxCodeText">{RegistergetVerificationCodeLink}</div>
            <div onClick={()=>this.props.history.go(-1)}><a id="RegisterBoxCloseLoadLink"><CloseIcon fontSize="large" style={{position:'absolute', left:'492px', top:'13px'}}/></a></div>
          </div>
      <Switch>
        <Route exact path="/load/register/emailfalse">
          <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
            <div id="BackKeywordBox1Header">该用户已经注册</div>
            <div onClick={() => this.props.history.go(-1) }> 
              <Loadregisterfalse/>     
            </div>
          </div>
        </Route>
        <Route exact path="/load/register/codefalse">
          <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
            <div id="BackKeywordBox1Header">验证码错误，请重新注册</div>
            <div onClick={() => this.props.history.go(-1) }> 
              <Loadregisterfalse/>     
            </div>
          </div>
        </Route>
          <Route exact path="/load/register/access">
            <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
              <div id="BackKeywordBox1Header">      注册成功</div>
              <div onClick={() => this.props.history.go(-2) }>      
              <Loadregisteraccess/>
            </div>
            </div>
          </Route>
        <Route exact path="/"></Route>
      </Switch>

      </div>
      
    );
  }
}


export function Loadregisterfalse() {
  const classes = useStyles();
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

export function Loadregisteraccess() {
  const classes = useStyles();
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




export function RegisterBoxButton() {
  const classes = useStyles();
  return (
    <div>
      <Button id="RegisterBoxButton"
        variant="contained"
        className={classes.button}
      >
        完成注册
      </Button>
    </div>
  );
}

export default withRouter(RegisterPage);
