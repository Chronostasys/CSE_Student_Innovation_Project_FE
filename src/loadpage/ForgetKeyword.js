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
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'qs';

import '../indexpage.css';
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

/**************************** forgeKeyword *******************************/

let forgeKeywordEmail;

class ForgeKeyword extends React.Component {
  constructor(props) {
    super(props);
    this.handleForgeKeywordClick1Change = this.handleForgeKeywordClick1Change.bind(this);
    this.handleForgeKeywordClick2Change = this.handleForgeKeywordClick2Change.bind(this);
    this.handleForgeKeywordClick3Change = this.handleForgeKeywordClick3Change.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onVerificationCodeChange = this.onVerificationCodeChange.bind(this);
    this.onKeywordChange1 = this.onKeywordChange1.bind(this);
    this.onKeywordChange2 = this.onKeywordChange2.bind(this);
    this.state = {ForgeKeywordPageStage: 1, 
      theEmail: '', EmailJudge: 'T',
      VerificationCode: '', VerificationCodeJudge: 'T',
      NewKeyword1: '', NewKeyword2: '', NewKeywordJudge: 'T',
      };
  }
  handleForgeKeywordClick1Change() {
    const putEmail = this.state.theEmail;
    if ( putEmail.match(".+@.+(\\..{2,3})*\\..{2,3}") ) {
      this.setState({EmailJudge: 'T'});
    } else {
      this.setState({EmailJudge: 'F'});
      return;
    }
    axios({
      method: 'post',
      url: 'http://101.200.227.216:8080/api/auth/changePassword_Email',
      data: qs.stringify({
        email:`${putEmail}`,
      })
    })
    .then((response) => {
      this.setState({EmailJudge: 'T'});
      this.setState({ForgeKeywordPageStage: 2});
      forgeKeywordEmail = putEmail;
      console.log(1);
    })
    .catch((error) => {
      this.setState({EmailJudge: 'F'});
      console.log(2);
    });
  }

  
  handleForgeKeywordClick2Change() {
    const putVerificationCode = this.state.VerificationCode;
    const putEmail = this.state.theEmail;
    if ( putVerificationCode ) {
      this.setState({VerificationCodeJudge: 'T'});
    } else {
      this.setState({VerificationCodeJudge: 'F'});
      return;
    }
    axios({
      method: 'post',
      url: 'http://101.200.227.216:8080/api/auth/changePasswordVerify_code',
      data: qs.stringify({
        email: `${putEmail}`,
        verify_code: `${putVerificationCode}`
      })
    })
    .then((response) => {
      this.setState({VerificationCodeJudge: 'T'});
      this.setState({ForgeKeywordPageStage: 3});
      console.log(1);
    })
    .catch((error) => {
      this.setState({VerificationCodeJudge: 'F'});
      console.log(2);
    });
  

  }
  handleForgeKeywordClick3Change() {
    const putVerificationCode = this.state.VerificationCode;
    const putEmail = this.state.theEmail;
    const NewKeyword1 = this.state.NewKeyword1;
    const NewKeyword2 = this.state.NewKeyword2;
    if (NewKeyword1.match("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$") && NewKeyword1 == NewKeyword2) {
      this.setState({NewKeywordJudge: 'T'});
    } else {
      this.setState({NewKeywordJudge: 'F'});
      return;
    }
    axios({
      method: 'post',
      url: 'http://101.200.227.216:8080/api/auth/changePassword',
      data: qs.stringify({
        email: `${putEmail}`,
        new_password: `${NewKeyword1}`,
        verify_code: `${putVerificationCode}`,
      })
    })
    .then((response) => {
      this.setState({NewKeywordJudge: 'T'});
      this.props.history.push("/load");
      console.log(1);
    })
    .catch((error) => {
      this.setState({NewKeywordJudge: 'F'});
      console.log(2);
    });

  }
  onEmailChange(emailaddress) {
    this.setState({theEmail: emailaddress});
  }
  onVerificationCodeChange(theVerificationCodeaddress) {
    this.setState({VerificationCode: theVerificationCodeaddress});
  }
  onKeywordChange1(keyword) {
    this.setState({NewKeyword1: keyword});
    const NewKeyword1 = this.state.NewKeyword1;
    const NewKeyword2 = this.state.NewKeyword2;
  }
  onKeywordChange2(keyword) {
    this.setState({NewKeyword2: keyword});   
    const NewKeyword1 = this.state.NewKeyword1;
    const NewKeyword2 = this.state.NewKeyword2;
  }
  render() {
    const ForgeKeywordPageStage = this.state.ForgeKeywordPageStage;
    const Emailjudge = this.state.EmailJudge;
    const VerificationCodejudge = this.state.VerificationCodeJudge;
    const NewKeywordJudge = this.state.NewKeywordJudge;
    let NowBackKeywordBox;
    if (ForgeKeywordPageStage == 0) {
      return null;
    } else if (ForgeKeywordPageStage == 1) {
      NowBackKeywordBox = 
      <BackKeywordBox1 
        handleForgeKeywordClick1Change = {this.handleForgeKeywordClick1Change}
        onEmailChange = {this.onEmailChange}
        EmailJudge = {Emailjudge}
      />;
    } else if (ForgeKeywordPageStage == 2) {
      NowBackKeywordBox = 
      <BackKeywordBox2 
        handleForgeKeywordClick2Change = {this.handleForgeKeywordClick2Change}
        onVerificationCodeChange = {this.onVerificationCodeChange}
        VerificationCodeJudge = {VerificationCodejudge}
      />;
    } else if (ForgeKeywordPageStage == 3) {
      NowBackKeywordBox = 
      <BackKeywordBox3 
        handleForgeKeywordClick3Change = {this.handleForgeKeywordClick3Change}
        onKeywordChange1 = {this.onKeywordChange1}
        onKeywordChange2 = {this.onKeywordChange2}
        NewKeywordJudge = {NewKeywordJudge}
      />;
    }
    return (
      <div>
        <SimpleBackdrop />
        {NowBackKeywordBox}
      </div>
    );
  }
}

/**************************** ForgeKeyword Box 1 *******************************/
class BackKeywordBox1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleForgeKeywordClick1 = this.handleForgeKeywordClick1.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleForgeKeywordClick1() {
    this.props.handleForgeKeywordClick1Change();
  }
  handleChange(e) {
    this.props.onEmailChange(e.target.value);
  }
  render() {
    const EmailJudge = this.props.EmailJudge;
    let TextFieldBackKeywordBox1;
    if (EmailJudge == 'T') {
      TextFieldBackKeywordBox1 = <TextField label="注册邮箱" onChange={this.handleChange}/>
    } else if (EmailJudge == 'F') {
      TextFieldBackKeywordBox1 = <TextField error id="standard-error-helper-text" label="邮箱" helperText="账号不存在" onChange={this.handleChange} />
    }
    return (
      <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
        <div id="BackKeywordBox1Header">找回密码</div>
        <div id="BackKeywordBox1TextField">{TextFieldBackKeywordBox1}</div>
        <div onClick={this.handleForgeKeywordClick1}><BackKeywordBox1Button/></div>
        <Link to={"/load"} id="RegisterBoxCloseLoadLink" ><CloseIcon fontSize="large" style={{position:'absolute', left:'380px', top:'8px', zIndex:'3000'}}/></Link>
      </div>
    );
  }
}

export function BackKeywordBox1Button() {
  const classes = useStyles();
  return (
    <div>
      <Button id="BackKeywordBox1Button"
        variant="contained"
        className={classes.button}
        endIcon={<ArrowForwardIcon />}
      >
        下一步
      </Button>
    </div>
  );
}

/**************************** Register Box 2 *******************************/
class BackKeywordBox2 extends React.Component {
  constructor(props) {
    super(props);
    this.handleForgeKeywordClick2 = this.handleForgeKeywordClick2.bind(this);
    this.BackKeywordBox2postVerificationCode = this.BackKeywordBox2postVerificationCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {postVerificationCodeTime: 0};
  }
  handleForgeKeywordClick2() {
    this.props.handleForgeKeywordClick2Change();
  }
  handleChange(e) {
    this.props.onVerificationCodeChange(e.target.value);
  }
  BackKeywordBox2postVerificationCode() {
    this.RegisterpostVerificationCode();
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

  RegisterpostVerificationCode() {
    axios({
      method: 'post',
      url: 'http://101.200.227.216:8080/api/auth/sendVerifyCode',
      data:  qs.stringify({
        email:`${forgeKeywordEmail}`,
      })
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    const VerificationCodeJudge = this.props.VerificationCodeJudge;
    let TextFieldBackKeywordBox2, BackKeywordBox2getVerificationCodeLink;
    if (VerificationCodeJudge == 'T') {
      TextFieldBackKeywordBox2 = <TextField label="验证码" onChange={this.handleChange}/>
    } else if (VerificationCodeJudge == 'F') {
      TextFieldBackKeywordBox2 = <TextField error id="standard-error-helper-text" label="验证码" helperText="验证码错误" onChange={this.handleChange} />
    }
    if (this.state.postVerificationCodeTime == 0) {
      BackKeywordBox2getVerificationCodeLink = <a className="BackKeywordBox2getVerificationCodeLinkT" href="javascript:;">发送验证码</a>
    } else {
      BackKeywordBox2getVerificationCodeLink = <a className="BackKeywordBox2getVerificationCodeLinkF">60s后重新获取</a>
    }

    return (
      <div id="BackKeywordBox1" style={{zIndex:"1500"}}>
        <div id="BackKeywordBox1Header">找回密码</div>
        <div onClick={this.BackKeywordBox2postVerificationCode}>{BackKeywordBox2getVerificationCodeLink}</div>
        <div id="BackKeywordBox1TextField">{TextFieldBackKeywordBox2}</div>
        <div onClick={this.handleForgeKeywordClick2}><BackKeywordBox2Button/></div>
        <Link to={"/load"} id="RegisterBoxCloseLoadLink" ><CloseIcon fontSize="large" style={{position:'absolute', left:'380px', top:'8px', zIndex:'3000'}}/></Link>
      </div>
    );
  }
}

export function BackKeywordBox2Button() {
  const classes = useStyles();
  return (
    <div>
      <Button id="BackKeywordBox1Button"
        variant="contained"
        className={classes.button}
        endIcon={<ArrowForwardIcon />}
      >
        下一步
      </Button>
    </div>
  );
}

/**************************** ForgeKeyword Box 3 *******************************/
class BackKeywordBox3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleForgeKeywordClick3 = this.handleForgeKeywordClick3.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }
  handleForgeKeywordClick3() {
    this.props.handleForgeKeywordClick3Change();
  }
  handleChange1(e) {
    this.props.onKeywordChange1(e.target.value);
  }
  handleChange2(e) {
    this.props.onKeywordChange2(e.target.value);
  }

  render() {
    const NewKeywordJudge = this.props.NewKeywordJudge;
    let TextFieldBackKeywordBox31, TextFieldBackKeywordBox32;
    if (NewKeywordJudge == 'T') {
      TextFieldBackKeywordBox31 = <TextField label="新密码" onChange={this.handleChange1}/>
      TextFieldBackKeywordBox32 = <TextField label="确认新密码" onChange={this.handleChange2}/>
    } else if (NewKeywordJudge == 'F') {
      TextFieldBackKeywordBox31 = <TextField label="新密码" onChange={this.handleChange1}/>
      TextFieldBackKeywordBox32 = <TextField error id="standard-error-helper-text" label="确认新密码" helperText="两次输入密码不一致或密码不是由8-16位数字和字符组成" onChange={this.handleChange2} />
    }
    return (
      <div id="BackKeywordBox3" style={{zIndex:"1500"}}>
        <div id="BackKeywordBox1Header">找回密码</div>
        <div id="BackKeywordBox3TextField1">{TextFieldBackKeywordBox31}</div>
        <div id="BackKeywordBox3TextField2">{TextFieldBackKeywordBox32}</div>
        <div onClick={this.handleForgeKeywordClick3}><BackKeywordBox3Button/></div>
        <Link to={"/load"} id="RegisterBoxCloseLoadLink" ><CloseIcon fontSize="large" style={{position:'absolute', left:'380px', top:'8px', zIndex:'3000'}}/></Link>
      </div>
    );
  }
}

export function BackKeywordBox3Button() {
  const classes = useStyles();
  return (
    <div>
      <Button id="BackKeywordBox3Button"
        variant="contained"
        className={classes.button}
      >
        完成
      </Button>
    </div>
  );
}


export default withRouter(ForgeKeyword);



