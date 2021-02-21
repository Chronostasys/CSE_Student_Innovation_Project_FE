import React,{ useState,useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import TextsmsIcon from '@material-ui/icons/Textsms';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CheckIcon from '@material-ui/icons/Check';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import './indexHomepage.css';
import axios from 'axios';
import qs from 'qs';

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



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CommentBoxButtonuseStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export function BasicPagination() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination count={10} />
    </div>
  );
}

const PostAllData=()=> {
  const [posts, setPosts]=useState([])
  const { ID } = useParams();
  const theURL = 'http://101.200.227.216:8080/api/blog/detail/'+(ID);
  const getPosts = async () => {
    try {
    const userPosts = await   axios({
      method: 'get',
      url: theURL,
      headers: {
        token: localStorage.getItem('token'),
      },
    })
      setPosts(userPosts.data);  // set State
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{
    
    getPosts()
  },[])  // includes empty dependency array
  console.log(posts);
  if(posts != ''){
    const theTime = posts.publish_time.substring(0, 19);
    return (
      <div>
        {SimpleContainer(posts.title,posts.content,theTime)}
        {HomePageWriterBox(posts.author_name)}
        {HomePageRegonizationBox()}
      </div>
    );
  }else {
    return(
      <div></div>
    )
  }
}
export default PostAllData;




export function HomePageWriterBox(author_name) {
  return (
    <div className="HomePageWriterBox">
      <div id="HomePageWriterBoxImg"></div>
      <div id="HomePageWriterBoxName">{author_name}</div>
      <div id="HomePageWriterBoxSignature">个性签名</div>
    </div>
  );
}

export function HomePageRegonizationBox() {
  return (
    <div className="HomePageRegonizationBox">
      <div id="HomePageRegonizationBoxImg"></div>
      <div id="HomePageRegonizationBoxName">xxxx项目</div>
      <div id="HomePageRegonizationBoxSignature">互联网   人工智能</div>
    </div>
  );
}

export function SimpleContainer(title,content,publish_time) {
  return (
    <div>
    <React.Fragment>
      <Container maxWidth="sm" style={{backgroundColor:'white'}}>
        <Typography style={{ width:'657px',position:'absolute', left:'calc(8% + 88px)',top:"103px",zIndex:"5000"}} >
        {HomePagePostingMain(title,content,publish_time)}
        <AlignItemsCommentList/>
        <HomePagePostingMyCommentBox/>
        </Typography>
      </Container>
    </React.Fragment>
    </div>
  );
}
export function HomePagePostingMain(title,content,publish_time) {
  return (
  <div>
    <div className="HomePagePostingHeader" >
      <div className="HomePagePostingHeaderText" style={{whiteSpace:'pre-line'}}>{title}</div>
      <div className="HomePagePostingHeaderTime">{publish_time}</div>
    </div>
    <div className="HomePagePostingText">
      <div className="HomePagePostingTextImg"></div>
      <div className="HomePagePostingTextContent" style={{whiteSpace:'pre-line'}}>
        {content}
      </div>
    </div>
  </div>
  );
}

export function HomePagePostingMyCommentBox() {
  const Buttonclasses = CommentBoxButtonuseStyles();

  return (
    <div className="HomePagePostingMyCommentBox">
      <div className="HomePagePostingMyCommentBoxHeader">
        <TextsmsIcon color="disabled" />
        <div className="HomePagePostingMyCommentBoxHeaderText">发布评论</div>    
      </div>
      <div className="HomePagePostingMyCommentTextBox">{StateTextFields()}</div>
      <div className="HomePagePostingMyCommentBoxButton">
        <Button
          variant="contained"
          color="default"
          className={Buttonclasses.button}
          startIcon={<CheckIcon />}
        >
          发送
        </Button>
      </div>

    </div>
  );
}

const CommentTextFielduseStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '650px',
    },
  },
}));

export function StateTextFields() {
  const classes = CommentTextFielduseStyles();
  const [Textvalue, setName] = React.useState('');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
            id="filled-multiline-static"
            className="MyCommentText"
            multiline
            rows={7}
            defaultValue="Default Value"
            variant="outlined"
            value={Textvalue}
            onChange={handleChange}  
          />
        </div>

    </form>
  );
}


const useStylesCommentList = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    fontSize:'12.5px',
    lineHeight:'200%',
    color:"#626262",
  },
  commentname: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '250%',
    letterSpacing: '0.1px',
    color: '#626262',
  }
}));

export function AlignItemsCommentList() {
  const classes = useStylesCommentList();
  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.commentname}
              >
                张三
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
              >
                写的不错
              </Typography>
            </React.Fragment>
          }
          style={{border:'none'}}
        />
        <div className="HomePagePostingCommentTime">2022-02-08 21:39:43</div>
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.commentname}
              >
                LISA
              </Typography>
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                写的真好
              </Typography>
            </React.Fragment>
          }
        />
        <div className="HomePagePostingCommentTime">2022-02-08 21:39:43</div>
      </ListItem>
    </List>
  );
}


