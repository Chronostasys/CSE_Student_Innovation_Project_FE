import React, { useState,useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import FaceIcon from '@material-ui/icons/Face';
import HomePagePosting from './HomeHomePagePosting';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import RegisterPage from './loadpage/Register';
import axios from 'axios';
import qs from 'qs';

import myhomespace from './myhomespace';
import MyPosting from './MyPosting';
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

let total_number = 0;
let myselfState = 0;
let myselfName = '';
let myselfEmail = '';


const PaginationControlleduseStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function firstPageMain(props) {

  return(
    <div>
      {GetFirstPage(props)}
      <Switch>
        <Route exact path="/home/homespace">{myhomespace}</Route>
        <Route path="/home/homepage/posting"><MyPosting style={{padding:'0'}}/></Route>
        <Route exact path="/home/homepage/register">
          <RegisterPage />
        </Route>
      </Switch>
    </div>
  )
}


const GetFirstPage=(props)=> {
    const [posts, setPosts]=useState([])
    let FirstPageChangeLoadBoxT = false;
    const getPosts = async () => {
      try {
      const userPosts = await     axios({
        method: 'get',
        url: 'http://101.200.227.216:8080/api/auth/myself',
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
    let FirstPageChangeLoadBox,ToPostingHiddenBox;
    if (posts != "") {
      FirstPageChangeLoadBox = FirstPageUserBox(posts.name,props.history);
      ToPostingHiddenBox = <ToPostingBox/>;
    } else {
      FirstPageChangeLoadBox = <FirstPageUnLoadBox/>;
      ToPostingHiddenBox = null;
    }  
      return(
      <div>
      <Switch>
        <Route path={`/home/homepage/:ID`}><HomePagePosting/></Route>
        <Route exact path="/home/homepage">
          {PaginationControlled(props.history)}
          {FirstPageChangeLoadBox}
          {ToPostingHiddenBox}
        </Route>
        <Route exact path="/">        
          {PaginationControlled(props.history)}
          {FirstPageChangeLoadBox}
          {ToPostingHiddenBox}
        </Route>      
      </Switch>
    </div>
    )
};

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
      <Link to="/home/homepage/posting"><FloatingActionButtons/></Link>
      <Link to="/home/homepage/posting" className="ToPostingBoxText">我要发帖</Link>
    </div>
  );
}

export function FirstPageUserBox(getmyselfName,history) {
  let OrganizationName ="华中科技大学";
  return (
    <div className="FirstPageUserBox">
      <div id="FirstPageUserBoxImg"></div>
      <div className="FirstPageUserBoxNameBox">
        <div id="FirstPageUserBoxName">{getmyselfName}</div>
      </div>
      <div className="FirstPageUserBoxOrganizationBox">
        <div className="FirstPageUserOrganizationHeaderBox">
          <div className="FirstPageUserOrganizationHeader">
            <SupervisedUserCircleIcon color="action" style={{ fontSize: 27 }}/>
            <div className="FirstPageUserOrganizationHeaderText">
              我的组织
            </div>            
          </div>
        </div>
        <div className="FirstPageUserOrganizationList">
          {FirstPageUserOrganization(OrganizationName)}
          {FirstPageUserOrganization(OrganizationName)}
          {FirstPageUserOrganization(OrganizationName)}
        </div>
        {/* 
        <div className="FirstPageUserOrganizationJoinBox">
          <GroupAddIcon color="action" style={{ fontSize: 27 }}/>
          <div className="FirstPageUserOrganizationJoin" onClick={()=>history.push("/home/homepage/")}>
            申请加入组织
          </div>
        </div>
        */}
      </div>
    </div>
  );
}

export function FirstPageUserOrganization(OrganizationName) {
  return (
    <div className="FirstPageUserOrganization">●&nbsp;&nbsp;&nbsp;{OrganizationName}</div>
  );
}

export function FirstPageUnLoadBox() {
  return (
    <div className="FirstPageUnLoadBox">
      <FaceIcon style={{height: '54px',width:'54px',position:'absolute', left:'156px',top:"26px", opacity:'0.7'}}/>
      <div id="FirstPageUnLoadBoxText">您还未登录哦</div>
      <Link to={"/load"} id="FirstPageUnLoadBoxLoadLink">登录</Link>
      <Link to={"/home/homepage/register"} id="FirstPageUnLoadBoxRegisterLink">免费注册</Link>
    </div>
  );
}

export function SimpleContainer(thepage,history) {

    return (
    <div>
    <React.Fragment style={{padding:"0"}}>
      <Container maxWidth="sm" style={{padding:"0"}}>
        <Typography style={{  height: '576px',width:'857px',position:'absolute', left:'calc(5% + 28px)',top:"103px"}} >
          {PostList(thepage,0,history)}
          {PostList(thepage,1,history)}
          {PostList(thepage,2,history)}
          {PostList(thepage,3,history)}
        </Typography>
      </Container>
    </React.Fragment>
    </div>
  )

}

const PaginationControlled=(history)=> {
  const [posts, setPosts]=useState([])
  const classes = PaginationControlleduseStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const getPosts = async () => {
    try {
    const userPosts = await   axios({
      method: 'get',
      url: 'http://101.200.227.216:8080/api/blog/getBlogNumber',
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
  return (
    <div>
      {SimpleContainer(page,history)}
      <div style={{position:'absolute', left:'616px',top:"695px"}}><Pagination count={parseInt((posts.total_number-1)/4)+1} page={page} onChange={handleChange} /></div>

    </div>
  );
}


const PostList=(page,index,history)=> {
  const [posts, setPosts]=useState([]);
  let theURL = 'http://101.200.227.216:8080/api/blog?page='+(page-1)+'&blog_num=4';
  console.log(page);
  const getPostsPage = async () => {
    try {
    const userPosts = await     axios({
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
    getPostsPage();
  },[page])     // includes empty dependency array
    
    if(posts != ''){
      const theMod = Object.keys(posts.msg).length;

    if(index < theMod){
     let blogsIDs = posts.msg[index].blog_id;
      let titles = posts.msg[index].title;
      let contents = posts.msg[index].content;
      let publish_times = posts.msg[index].publish_time.substring(0, 19);
      let author_names = posts.msg[index].author_name; 
      return(
    <div className="MessageBox" onClick={()=>history.push("/home/homepage/"+blogsIDs)}>
      <div className="MessageBoxHeader">
        {titles}
      </div>
      <span className="MessageBoxMainText" style={{"WebkitBoxOrient": "vertical"}}>
        {contents}
      </span>    
      <div className="MessageBoxTopDot"/>
      <div className="MessageBoxTime">
        {publish_times}
      </div>
      <div className="MessageBoxPoster">    
        <div className="MessageBoxName">
          {author_names}
        </div>    
        {/*<div className="MessageBoxCompanyName">
          
        </div>*/}
      </div>
    </div>
    )}
    else{
      return;
    }
}
}

export default withRouter(firstPageMain);




