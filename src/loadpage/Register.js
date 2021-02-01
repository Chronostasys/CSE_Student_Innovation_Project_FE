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

import '../index.css';
import { red } from '@material-ui/core/colors';



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
  RegisterpostVerificationCode() {
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
    let RegisterPageFinishClickChange = true;
    if ( userName ) {
      this.setState({userNameJudge: 'T'});
      console.log(userName);
    } else {
      this.setState({userNameJudge: 'F'});
      RegisterPageFinishClickChange = false;
      console.log(userName);
    }
    if ( putEmail.match(".+@.+(\\..{2,3})*\\..{2,3}") ) {
      this.setState({EmailJudge: 'T'});
    } else {
      this.setState({EmailJudge: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if ( putVerificationCode ) {
      this.setState({VerificationCodeJudge: 'T'});
    } else {
      this.setState({VerificationCodeJudge: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if (NewKeyword1 != '' && NewKeyword1 == NewKeyword2) {
      this.setState({NewKeywordJudge2: 'T'});
    } else {
      this.setState({NewKeywordJudge2: 'F'});
      RegisterPageFinishClickChange = false;
    }
    if (RegisterPageFinishClickChange) {
      this.setState({RegisterPageStage: 0});
      this.props.history.push("/Load");    
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
      RegistergetVerificationCodeLink = <a className="RegistergetVerificationCodeLinkT" href="javascript:;">重新发送验证码</a>
    } else {
      RegistergetVerificationCodeLink = <a className="RegistergetVerificationCodeLinkF">60s后重新获取</a>
    }

  
    if (userNamejudge == 'T') {
      TextFieldRegisterBoxUserName = <TextField label="用户名" onChange={this.onUserNameChange}/>
    } else if (userNamejudge == 'F'){
      TextFieldRegisterBoxUserName = <TextField error id="standard-error-helper-text" label="用户名" helperText="用户名已存在" onChange={this.onUserNameChange} />      
    }
    if (Emailjudge == 'T') {
      TextFieldRegisterBoxEmail = <TextField label="邮箱" onChange={this.onEmailChange}/>
    } else if (Emailjudge == 'F') {
      TextFieldRegisterBoxEmail = <TextField error id="standard-error-helper-text" label="邮箱" helperText="邮箱已注册" onChange={this.onEmailChange} />      
    }
    if (VerificationCodejudge == 'T') {
      TextFieldRegisterBoxVerificationCode = <TextField label="验证码" onChange={this.onVerificationCodeChange}/>
    } else if (VerificationCodejudge == 'F') {
      TextFieldRegisterBoxVerificationCode = <TextField error id="standard-error-helper-text" label="验证码" helperText="验证码错误" onChange={this.onVerificationCodeChange} />      
    }
    if (NewKeywordJudge1 == 'T') {
      TextFieldRegisterBoxKeyword1 = <TextField label="密码" onChange={this.onKeywordChange1}/>
    } else if (NewKeywordJudge1 == 'F') {
      TextFieldRegisterBoxKeyword1 = <TextField error id="standard-error-helper-text" label="密码" helperText="密码不合规范" onChange={this.onKeywordChange1} />      
    }
    if (NewKeywordJudge2 == 'T') {
      TextFieldRegisterBoxKeyword2 = <TextField label="密码" onChange={this.onKeywordChange2}/>
    } else if (NewKeywordJudge2 == 'F') {
      TextFieldRegisterBoxKeyword2 = <TextField error id="standard-error-helper-text" label="密码" helperText="两次输入密码不一致" onChange={this.onKeywordChange2} />      
    }

    return (
      
      <div>

        <SimpleBackdrop />
        
          <div id="RegisterBox" style={{zIndex:"1500"}}>
            <div id="RegisterBoxHeader">欢迎注册</div>
            <div id="RegisterBoxHeadText">已有账户？</div>
            <Link to={"/Load"} id="RegisterBoxLoadLink">点击登录</Link>
            <div id="TextFieldRegisterBoxUserNameBox">{TextFieldRegisterBoxUserName}</div>
            <div id="TextFieldRegisterBoxEmailBox">{TextFieldRegisterBoxEmail}</div>
            <div id="TextFieldRegisterBoxVerificationCodeBox">{TextFieldRegisterBoxVerificationCode}</div>
            <div id="TextFieldRegisterBoxKeywordBox1">{TextFieldRegisterBoxKeyword1}</div>
            <div id="TextFieldRegisterBoxKeywordBox2">{TextFieldRegisterBoxKeyword2}</div>
            <div onClick={this.handleRegisterPageFinishClickChange}><RegisterBoxButton /></div>
            <div id="RegisterBoxText1">用于论坛内显示，后期可修改</div>
            <div id="RegisterBoxText2">登陆时使用</div>
            <div id="RegisterBoxCodeText" onClick={this.RegisterpostVerificationCode}>{RegistergetVerificationCodeLink}</div>
            <Link to={"/Load"} id="RegisterBoxCloseLoadLink" ><CloseIcon fontSize="large" style={{position:'absolute', left:'492px', top:'13px'}}/></Link>
          </div>

      </div>
      
    );
  }
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
