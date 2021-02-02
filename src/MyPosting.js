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





export default function MyPosting() {
  return (
    <div style={{margin:'-24px -24px',width:"calc(100% + 48px)", backgroundColor:"rgba(38, 59, 100, 0.16)",height:'1100px'}}>
      <SimpleContainer/>
    </div>
  );
}

export function SimpleContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography component="div" style={{backgroundColor:'#fff',height:'1040px',width:'809px',padding:'44px 59px 0 59px',position:'absolute',top:'86px',left:'calc(50% - 404px)'}} >
          <PostingMain/>
          <div className="MyPostingMainCloseIcon" ><CloseIcon fontSize="large" style={{position:'relative',top:'4.5px',left:'5px',color: 'white'}}/></div>

        </Typography>
      </Container>
    </React.Fragment>
  );
}

export function PostingMain() {
  return (
    <div>
      <PostingContent/>
      <PostingFinishButton/>
      
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

export function PostingContent() {
  const classes = PostingContentuseStyles();
  const [Headervalue, HeadersetValue] = React.useState('');
  const [Textvalue, TextsetValue] = React.useState('');
  const HeadervaluehandleChange = (event) => {
    HeadersetValue(event.target.value);
    console.log(event);
  };
  const TextvaluehandleChange = (event) => {
    TextsetValue(event.target.value);
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

export function PostingFinishButton() {
  return (
    <div>
    </div>
  );
}
export function PostingAbandonButton() {
  return (
    <div>
    </div>
  );
}



