import React,{ useState,useEffect } from 'react';
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
import './indexpage.css';
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

export function BasicPagination() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination count={10} />
    </div>
  );
}

{/* 
export default function Posting() {
  let { ID } = useParams();
  const [SimpleContainerT, setSimpleContainer] = useState(false);
  const [blogsIDs, setblogsIDs] = React.useState('');
  const [titles, settitles] = React.useState('');
  const [contents, setcontents] = React.useState('');
  const [author_names, setauthor_names] = React.useState('');
  const [publish_times, setpublish_times] = React.useState('');
  const theURL = 'http://101.200.227.216:8080/api/blog/detail/'+(ID);

  axios({
    method: 'get',
    url: theURL,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    setblogsIDs(response.data.blog_id);
    settitles(response.data.title);
    setcontents(response.data.content);
    setauthor_names(response.data.author_name);
    const nowTime = response.data.publish_time;
    let theNowTime = nowTime.substring(0, 19);
    setpublish_times(theNowTime);

    setSimpleContainer(true);
  })
  .catch((error) => {
    setSimpleContainer(false);
    setblogsIDs('');
    settitles('');
    setcontents('');
    setauthor_names('');
    setpublish_times('');
  })

  return (
    <div>
      <PostAllData/>
      {SimpleContainer(titles,contents,publish_times)}
      {HomePageWriterBox(author_names)}
      
    </div>
  );
}*/}

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
        {/*<AlignItemsCommentList/>
        <HomePagePostingMyCommentBox/>*/}
        </Typography>
      </Container>
    </React.Fragment>
    {/*<div style={{position:'absolute', left:'616px',top:"675px"}}><BasicPagination/></div>*/}
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
  return (
    <div>
      <div className="HomePagePostingMyCommentBoxHeader">
        <div><TextsmsIcon/></div>
      </div>
      <div className="HomePagePostingMyCommentTextBox"></div>
      <div className="HomePagePostingMyCommentBoxButton"></div>

    </div>
  );
}



















{/** 
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
                张三AAA
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
                写的不错DAAA啊AAAAAAAAAAAAAAAAAAAA
              </Typography>
            </React.Fragment>
          }
          style={{border:'none'}}
        />
      </ListItem>
    </List>
  );
}

**/}
