import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FaceIcon from '@material-ui/icons/Face';
import HomePagePosting from './HomeHomePagePosting';

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



export default function FirstPage() {
  return (
    <div>
      
      
            
      <Switch>
        <Route path="/Home/HomePage/1" ><HomePagePosting/></Route>
        <Route exact path="/Home/HomePage"><SimpleContainer /><FirstPageUserBox/></Route>
        <Route exact path="/"></Route>      
      </Switch>
    </div>
  );
}

export function FirstPageUserBox() {
  return (
    <div className="FirstPageUserBox">
      <div id="FirstPageUserBoxImg"></div>
      <div id="FirstPageUserBoxName">李狗蛋</div>
    </div>
  );
}


export function FirstPageUnLoadBox() {
  return (
    <div className="FirstPageUnLoadBox">
      <FaceIcon style={{height: '54px',width:'54px',position:'absolute', left:'156px',top:"26px", opacity:'0.7'}}/>
      <div id="FirstPageUnLoadBoxText">您还未登录哦</div>
      <Link to={"/Load"} id="FirstPageUnLoadBoxLoadLink">登录</Link>
      <Link to={"/Load/register"} id="FirstPageUnLoadBoxRegisterLink">免费注册</Link>
    </div>
  );
}


export function SimpleContainer() {
  return (
    <div>
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography style={{  height: '576px',width:'857px',position:'absolute', left:'calc(5% + 28px)',top:"103px"}} >
          <Link to="/Home/HomePage/1"><MessageBox/></Link>
          <MessageBox/>
          <MessageBox/>
          <MessageBox/>

        </Typography>
      </Container>
    </React.Fragment>
    <div style={{position:'absolute', left:'616px',top:"675px"}}><BasicPagination/></div>
    </div>
  );
}


export function MessageBox() {
  return (
    <div className="MessageBox" >
      <div className="MessageBoxHeader">
        我是标题我是标题我是标题我是标题我是标题
      </div>
      <div className="MessageBoxMainText">
        我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介我是简介
      </div>    
      <div className="MessageBoxTopDot"/>
      <div className="MessageBoxTime">
        2020/12/12  23:00
      </div>
      <div className="MessageBoxPoster">    
        <div className="MessageBoxName">
          李狗蛋
        </div>    
        <div className="MessageBoxCompanyName">
          华中科技大学
        </div>    
      </div>



    </div>
  );
}





