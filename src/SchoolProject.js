import React, { useState,useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FaceIcon from '@material-ui/icons/Face';
import HomePagePosting from './HomeHomePagePosting';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import StayPrimaryPortraitIcon from '@material-ui/icons/StayPrimaryPortrait';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import qs from 'qs';

import './indexHomepage.css';

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


const useStylesbackdrop = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
const PaginationControlleduseStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function SchoolProjectMain(props) {

  return(
    <div>
      {GetSchoolProjectPage(props.history)}
    </div>
  )
}

export function GetSchoolProjectPage(history) {
  const [posts, setPosts]=useState([])
  const classes = PaginationControlleduseStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      {SchoolProjectList(page,history)}
      <div style={{position:'absolute', right:"calc(50% - 1041px/2)",top:"995px"}}>
          <Pagination count={parseInt(2)} page={page} onChange={handleChange} className="SchoolProjectListPagination"/>
      </div>

    </div>
  );
}

export function SchoolProjectList(page,history) {

  return (
    <div>
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography className="SchoolProjectList">
          page:{page}
          {SchoolProjectLink(history)}
          {SchoolProjectLink(history)}
          {SchoolProjectLink(history)}          

        </Typography>
      </Container>
    </React.Fragment>
    </div>
  )
}

export function SchoolProjectLink(history) {
  const classes = useStylesbackdrop();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return(
    <div>
    <div className="SchoolProjectLink" onClick={handleToggle}>
      <div className="SchoolProjectImg"></div>
      <div className="SchoolProjectName">我是名字我是名字</div>
      <div className="SchoolProjectContent">我是内容我是内容我是内容我是内容我是内容我是内容</div>
      <div className="SchoolProjectToLink"><KeyboardArrowRightIcon style={{ fontSize: 30, color:"#FFAE12" }}/></div>
    </div>
      <Backdrop className={classes.backdrop} open={open}>
        <div className="schoolProjectPage">
          111
          <div className="schoolProjectPageImg"></div>
          <div className="schoolProjectPageName">我是名字我是名字</div>
          <div className="schoolProjectPageContent">我是内容我是内容我是内容我是内容我是内容我是内容</div>
          <div className="schoolProjectPageLongContent">公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介。公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介。公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介公司简介
公司简介公司简介公司简介公司简介公司简介公司简介。

</div>
          <div className="schoolProjectPageEmail">baidu@qq.com</div>
          <div className="schoolProjectPagePhone1">0731-86273728</div>
          <div className="schoolProjectPagePhone2">15200000001</div>
          <div className="schoolProjectPageLine"></div>
          <div className="schoolProjectPageEmail">baidu@qq.com</div>
          <div className="schoolProjectPagePhone1">0731-86273728</div>
          <div className="schoolProjectPagePhone2">15200000001</div>
          <div className="schoolProjectPageMailIcon"><MailIcon color="disabled" /></div>
          <div className="schoolProjectPagePhoneIcon"><PhoneIcon color="disabled" /></div>
          <div className="schoolProjectPageStayPrimaryPortraitIcon"><StayPrimaryPortraitIcon color="disabled" /></div>
          <div className="schoolProjectPageCloseIcon" onClick={handleClose}><CloseIcon style={{ color: 'white', fontSize: 42 }}/></div>

        </div>
      </Backdrop>
    </div>
  )
}



export default withRouter(SchoolProjectMain);
