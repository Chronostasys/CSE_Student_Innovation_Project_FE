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

export function AlignItemsCommenList() {
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
export function HomePageWriterBox() {
  return (
    <div className="HomePageWriterBox">
      <div id="HomePageWriterBoxImg"></div>
      <div id="HomePageWriterBoxName">作者李狗蛋</div>
    </div>
  );
}


export default function Posting() {
  return (
    <div>
      <SimpleContainer />
      <HomePageWriterBox />
    </div>
  );
}
export function SimpleContainer() {
  return (
    <div>
    <React.Fragment>
      <Container maxWidth="sm" style={{backgroundColor:'white'}}>
        <Typography style={{ width:'657px',position:'absolute', left:'calc(8% + 88px)',top:"103px",zIndex:"5000"}} >
        <HomePagePostingHeader/>
        <AlignItemsCommenList/>
        </Typography>
      </Container>
    </React.Fragment>
    {/*<div style={{position:'absolute', left:'616px',top:"675px"}}><BasicPagination/></div>*/}
    </div>
  );
}
export function HomePagePostingHeader() {
  return (
  <div>
    <div className="HomePagePostingHeader" >
      <div className="HomePagePostingHeaderText">我是标题我是标题我是标题我是标题我是标题我是标题</div>
      <div className="HomePagePostingHeaderTime">2020/12/12  23:00</div>
    </div>
    <div className="HomePagePostingText">
      <div className="HomePagePostingTextImg"></div>
      <div className="HomePagePostingTextContent">
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是
      内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容我是内容
      我是内容我是内容我是内容我是内容我是内容
      </div>
    </div>
  </div>
  );
}
export function HomePagePostingContent() {
  return (
    <div>
    </div>
  );
}

export function HomePagePostingComment() {
  return (
    <div>
    </div>
  );
}





