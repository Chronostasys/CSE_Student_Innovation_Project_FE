import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FaceIcon from '@material-ui/icons/Face';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextsmsIcon from '@material-ui/icons/Textsms';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
import qs from 'qs';

import './index.css';

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

const ButtonuseStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export function MyPostingMainCloseIcon(props) {
  props.history.push("/home/homepage/posting/back");
}
export function MyPostingMainCloseBoxClose(props) {
  props.history.push("/home/homepage");
}
export function MyPostingMainCloseBoxBack(props) {
  props.history.push("/home/homepage/posting");
}
export function MyPostingMainCloseBox(props) {
  return (
    <div className="MyPostingMainCloseBox">
      <div className="MyPostingMainCloseBoxSentimentVeryDissatisfiedIcon"><SentimentVeryDissatisfiedIcon/></div>
      <div className="MyPostingMainCloseBoxText">您确定要放弃编辑吗？</div>
      <div onClick={()=>MyPostingMainCloseBoxClose(props)} className="MyPostingMainCloseBoxCloseButtons"><MyPostingMainCloseBoxCloseButtons/></div>
      <div onClick={()=>MyPostingMainCloseBoxBack(props)} className="MyPostingMainCloseBoxBackButtons"><MyPostingMainCloseBoxBackButtons/></div>
    </div>
  )
}
export function MyPostingMainCloseBoxCloseButtons() {
  
  const classes = ButtonuseStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained">确认放弃</Button>
    </div>
  );
}
export function MyPostingMainCloseBoxBackButtons() {
  const classes = ButtonuseStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary">
        我再想想
      </Button>
     </div>
  );
}


export function MyPostingMainFinishBox(props) {
  return (
    <div className="MyPostingMainFinishBox">
      <div className="MyPostingMainFinishBoxSentimentSatisfiedAltIcon"><SentimentSatisfiedAltIcon/></div>
      <div className="MyPostingMainFinishBoxText">发布成功！</div>
      <div onClick={()=>MyPostingMainFinishBoxFinish(props)} className="MyPostingMainFinishBoxFinishButtons"><MyPostingMainCloseBoxFinishButtons/></div>
    </div>
  )
}
export function MyPostingMainFinishBoxFinish(props) {
  props.history.push("/Home/HomePage");
}

export function MyPostingMainCloseBoxFinishButtons() {
  const classes = ButtonuseStyles();
  return (
    <div className={classes.root}>
      <Button variant="contained" endIcon={<ArrowForwardIcon />}>返回首页</Button>
    </div>
  );
}
export function SimpleContainer(props) {

  return (
    <div style={{margin:'-24px -24px',width:"calc(100% + 48px)", backgroundColor:"rgba(38, 59, 100, 0.16)",height:'1100px'}}>
    <div style={{width:'800px',height:'65px',position:'absolute',zIndex:"5000",top:'0'}}></div>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{backgroundColor:'#fff',height:'1040px',width:'809px',padding:'44px 59px 0 59px',position:'absolute',top:'86px',left:'calc(50% - 404px)'}} >
          <PostingMain/>
          <div className="MyPostingMainCloseIcon" onClick={()=>MyPostingMainCloseIcon(props)}><CloseIcon fontSize="small" style={{position:'relative',top:'12px',left:'12.5px',color: 'white'}}/></div>
          <div className="MyPostingMainFinishIcon" onClick={()=>MyPostingMainFinishIcon(props)}><SendIcon fontSize="small" style={{position:'relative',top:'11.5px',left:'13.5px',color: 'white'}}/></div>
        </Typography>
      </Container>
    </React.Fragment>
    <Switch>
        <Route exact path="/home/homepage/posting/back">{MyPostingMainCloseBox(props)}</Route>
        <Route exact path="/home/homepage/posting/finish">{MyPostingMainFinishBox(props)}</Route>
        <Route exact path="/"></Route>      
    </Switch>
    </div>
  );
}

export function MyPostingMainFinishIcon(props) {
  console.log(HeadervalueText);
  console.log(TextvalueText);
  axios({
    method: 'post',
    url: 'http://101.200.227.216:8080/api/blog',
    headers: {
      token: localStorage.getItem('token'),
    },
    data:  qs.stringify({
      title: `${HeadervalueText}`,
      content: `${TextvalueText}`,
    })
  })
  .then((response) => {
    props.history.push("/home/homepage/posting/finish");
    console.log(response);   
  })
  .catch((error) => {
    console.log(error);   
    console.log(2);
  });
}

export function PostingMain() {
  return (
    <div>
      <PostingContent/>
    </div>
  );
}
const PostingContentuseStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '687px',
    },
  },
}));

let HeadervalueText, TextvalueText;

export function PostingContent() {
  const classes = PostingContentuseStyles();
  const [Headervalue, HeadersetValue] = React.useState('');
  const [Textvalue, TextsetValue] = React.useState('');
  const HeadervaluehandleChange = (event) => {
    HeadersetValue(event.target.value);
    HeadervalueText = Headervalue;
    console.log(event);
  };
  const TextvaluehandleChange = (event) => {
    TextsetValue(event.target.value);
    TextvalueText = Textvalue;
    console.log(event);
  };
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          className="MyPostingHeader"
          label="标题"
          placeholder="来为您的帖子命个名吧"
          multiline
          rowsMax={1}
          value={Headervalue}
          onChange={HeadervaluehandleChange}
        />
        <div style={{margin:'20px 0'}}>
          <TextField
            id="filled-multiline-static"
            className="MyPostingText"
            label="正文"
            multiline
            rows={37}
            defaultValue="Default Value"
            variant="outlined"
            value={Textvalue}
            onChange={TextvaluehandleChange}  
          />
        </div>
      </form>
    </div>
  );
}



export default withRouter(SimpleContainer);




{/* 
export default function PostingMain() {
  axios.get('http://101.200.227.216/api/auth/hello')
    .then(function(response) {
    console.log(response.data.msg);
  });
  return (
    <div>
      111111111
    </div>
  )

}
*/}

