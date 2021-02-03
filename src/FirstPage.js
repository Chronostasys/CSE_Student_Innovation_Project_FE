import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FaceIcon from '@material-ui/icons/Face';
import HomePagePosting from './HomeHomePagePosting';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

import MyPosting from './MyPosting';
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

const PaginationControlleduseStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function FirstPage() {
  return (
    <div>      
      
      <Switch>
        <Route exact path="/Home/HomePage/1" ><HomePagePosting/></Route>
        <Route exact path="/Home/HomePage">
          <PaginationControlled/>
          <FirstPageUnLoadBox/>
          <ToPostingBox/>
        </Route>
        <Route path="/Home/HomePage/Posting"><MyPosting style={{padding:'0'}}/></Route>
        <Route exact path="/"></Route>      
      </Switch>
    </div>
  );
}

const useStylesPostingButton = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export function FloatingActionButtons() {
  const classes = useStylesPostingButton();
  return (
    <div className={classes.root}>
      <Fab size="medium"  aria-label="add" style={{backgroundColor:"#263B64", color:"#fff"}}>
        <AddIcon />
      </Fab>
    </div>
  );
}

export function ToPostingBox() {
  return (
    <div className="ToPostingBox">
      <Link to="/Home/HomePage/Posting"><FloatingActionButtons/></Link>
      <Link to="/Home/HomePage/Posting" className="ToPostingBoxText">我要发帖</Link>
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
          <Link to="/Home/HomePage/1"><MessageBox/></Link>
          <MessageBox/>
          <MessageBox/>

        </Typography>
      </Container>
    </React.Fragment>
    </div>
  );
}

export function PaginationControlled() {
  const classes = PaginationControlleduseStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={classes.root}>
      <SimpleContainer/>
      page:{page}
      <div style={{position:'absolute', left:'616px',top:"675px"}}><Pagination count={10} page={page} onChange={handleChange} /></div>
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





