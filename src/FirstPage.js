import React, { useState } from 'react';
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
import RegisterPage from './loadpage/Register';
import axios from 'axios';
import qs from 'qs';

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

export function FirstPage(props) {
  let FirstPageChangeLoadBox,ToPostingHiddenBox;
  const [FirstPageChangeLoadBoxT, setFirstPageChangeLoadBox] = useState(false);
  const [myselfNameGet, setmyselfName] = useState('');
  axios({
    method: 'get',
    url: 'http://101.200.227.216:8080/api/blog/getBlogNumber',
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    total_number=response.data.total_number;
  })
  axios({
    method: 'get',
    url: 'http://101.200.227.216:8080/api/auth/myself',
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    myselfState = 1;
    myselfEmail = response.data.email;
    setFirstPageChangeLoadBox(true);
    setmyselfName(response.data.name);
    console.log(FirstPageChangeLoadBoxT);
    console.log(myselfName);
    {/* setFirstPageChangeLoadBox({FirstPageUserBox});
    setToPostingHiddenBox({ToPostingBox});*/}
  })
  .catch((error) => {
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';
    console.log(error);
    setFirstPageChangeLoadBox(false);
    {/* setFirstPageChangeLoadBox({FirstPageUnLoadBox});*/}
  })
  if (FirstPageChangeLoadBoxT) {
    FirstPageChangeLoadBox = FirstPageUserBox(myselfNameGet);
    ToPostingHiddenBox = <ToPostingBox/>;
  } else {
    FirstPageChangeLoadBox = <FirstPageUnLoadBox/>;
    ToPostingHiddenBox = null;
  }
{/* 
  const [FirstPageChangeLoadBox, setFirstPageChangeLoadBox] = React.useState();
  const [ToPostingHiddenBox, setToPostingHiddenBox] = React.useState();*/}

  return (
    <div>
      <Switch>
        <Route exact path="/Home/HomePage">
          {PaginationControlled(props.history)}
          {FirstPageChangeLoadBox}
          {ToPostingHiddenBox}
        </Route>
        <Route exact path="/Home/HomePage/register">
          {PaginationControlled(props.history)}
          {FirstPageChangeLoadBox}
          {ToPostingHiddenBox}
          <RegisterPage />
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

export function FirstPageUserBox(getmyselfName) {
  return (
    <div className="FirstPageUserBox">
      <div id="FirstPageUserBoxImg"></div>
      <div id="FirstPageUserBoxName">{getmyselfName}</div>
    </div>
  );
}


export function FirstPageUnLoadBox() {
  return (
    <div className="FirstPageUnLoadBox">
      <FaceIcon style={{height: '54px',width:'54px',position:'absolute', left:'156px',top:"26px", opacity:'0.7'}}/>
      <div id="FirstPageUnLoadBoxText">您还未登录哦</div>
      <Link to={"/Load"} id="FirstPageUnLoadBoxLoadLink">登录</Link>
      <Link to={"/Home/HomePage/register"} id="FirstPageUnLoadBoxRegisterLink">免费注册</Link>
    </div>
  );
}

export function SimpleContainer(page,history) {

  {/*const [SimpleContainerT, setSimpleContainer] = React.useState(false);
  const [blogsIDs0, setblogsIDs0] = React.useState('');
  const [blogsIDs1, setblogsIDs1] = React.useState('');
  const [blogsIDs2, setblogsIDs2] = React.useState('');
  const [blogsIDs3, setblogsIDs3] = React.useState('');
  const [titles0, settitles0] = React.useState('');
  const [titles1, settitles1] = React.useState('');
  const [titles2, settitles2] = React.useState('');
  const [titles3, settitles3] = React.useState('');
  const [contents0, setcontents0] = React.useState('');
  const [contents1, setcontents1] = React.useState('');
  const [contents2, setcontents2] = React.useState('');
  const [contents3, setcontents3] = React.useState('');
  const [author_names0, setauthor_names0] = React.useState('');
  const [author_names1, setauthor_names1] = React.useState('');
  const [author_names2, setauthor_names2] = React.useState('');
  const [author_names3, setauthor_names3] = React.useState('');
  const [publish_times0, setpublish_times0] = React.useState('');
  const [publish_times1, setpublish_times1] = React.useState('');
  const [publish_times2, setpublish_times2] = React.useState('');
  const [publish_times3, setpublish_times3] = React.useState('');
  
  const thepage = 'http://101.200.227.216:8080/api/blog?page='+1+'&blog_num=4';
  axios({
    method: 'get',
    url: thepage,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    myselfState = 1;
    setblogsIDs0(response.data.msg[0].blog_id);
    
    setblogsIDs1(response.data.msg[1].blog_id);
    setblogsIDs2(response.data.msg[2].blog_id);
    setblogsIDs3(response.data.msg[3].blog_id);
    settitles0(response.data.msg[0].title);
    settitles1(response.data.msg[1].title);
    settitles2(response.data.msg[2].title);
    settitles3(response.data.msg[3].title);
    setcontents0(response.data.msg[0].content);
    setcontents1(response.data.msg[1].content);
    setcontents2(response.data.msg[2].content);
    setcontents3(response.data.msg[3].content);
    setauthor_names0(response.data.msg[0].author_name);
    setauthor_names1(response.data.msg[1].author_name);
    setauthor_names2(response.data.msg[2].author_name);
    setauthor_names3(response.data.msg[3].author_name);
    setpublish_times0(response.data.msg[0].publish_time);
    setpublish_times1(response.data.msg[1].publish_time);
    setpublish_times2(response.data.msg[2].publish_time);
    setpublish_times3(response.data.msg[3].publish_time);
    setSimpleContainer(true);
  })
  .catch((error) => {
    setSimpleContainer(false);
    setblogsIDs0('');
    setblogsIDs1('');
    setblogsIDs2('');
    setblogsIDs3('');
    settitles0('');
    settitles1('');
    settitles2('');
    settitles3('');
    setcontents0('');
    setcontents1('');
    setcontents2('');
    setcontents3('');
    setauthor_names0('');
    setauthor_names1('');
    setauthor_names2('');
    setauthor_names3('');
    setpublish_times0('');
    setpublish_times1('');
    setpublish_times2('');
    setpublish_times3('');
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';
  })
  if (SimpleContainerT) {
    MessageBoxChange0 = MessageBox(blogsIDs0,titles0,contents0,author_names0,publish_times0);
    MessageBoxChange1 = MessageBox(blogsIDs1,titles1,contents1,author_names1,publish_times1);
    MessageBoxChange2 = MessageBox(blogsIDs2,titles2,contents2,author_names2,publish_times2);
    MessageBoxChange3 = MessageBox(blogsIDs3,titles3,contents3,author_names3,publish_times3);

  }else{
    MessageBoxChange0 = null;
  }
  const [HomePageFrontNameHiddenBoxT, setHomePageFrontNameHiddenBox] = useState(false);
  const [myselfNameGet, setmyselfName] = useState('');


  const [SimpleContainerT, setSimpleContainer] = useState(false);
  const [blogsIDs0, setblogsIDs0] = React.useState('');
  const [blogsIDs1, setblogsIDs_1] = React.useState('');
  const [blogsIDs2, setblogsIDs2] = React.useState('');
  const [blogsIDs3, setblogsIDs3] = React.useState('');
  const [titles0, settitles0] = React.useState('');
  const [titles1, settitles1] = React.useState('');
  const [titles2, settitles2] = React.useState('');
  const [titles3, settitles3] = React.useState('');
  const [contents0, setcontents0] = React.useState('');
  const [contents1, setcontents1] = React.useState('');
  const [contents2, setcontents2] = React.useState('');
  const [contents3, setcontents3] = React.useState('');
  const [author_names0, setauthor_names0] = React.useState('');
  const [author_names1, setauthor_names1] = React.useState('');
  const [author_names2, setauthor_names2] = React.useState('');
  const [author_names3, setauthor_names3] = React.useState('');
  const [publish_times0, setpublish_times0] = React.useState('');
  const [publish_times1, setpublish_times1] = React.useState('');
  const [publish_times2, setpublish_times2] = React.useState('');
  const [publish_times3, setpublish_times3] = React.useState('');

  const thepage = 'http://101.200.227.216:8080/api/blog?page='+1+'&blog_num=4';
  axios({
    method: 'get',
    url: thepage,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    myselfState = 1;
    setmyselfName(response.data.name);
    setHomePageFrontNameHiddenBox(true);
    console.log(response.data.msg[1].blog_id);
    setblogsIDs0(response.data.msg[0].blog_id);
    settitles0(response.data.msg[0].title);
    setcontents0(response.data.msg[1].content);
    setauthor_names0(response.data.msg[1].author_name);
    setpublish_times0(response.data.msg[1].publish_time);


    setSimpleContainer(true);*/}

{/* 
    setblogsIDs0(response.data.msg[0].blog_id);
    
    setblogsIDs1(response.data.msg[1].blog_id);
    setblogsIDs2(response.data.msg[2].blog_id);
    setblogsIDs3(response.data.msg[3].blog_id);
    settitles0(response.data.msg[0].title);
    settitles1(response.data.msg[1].title);
    settitles2(response.data.msg[2].title);
    settitles3(response.data.msg[3].title);
    setcontents0(response.data.msg[0].content);
    setcontents1(response.data.msg[1].content);
    setcontents2(response.data.msg[2].content);
    setcontents3(response.data.msg[3].content);
    setauthor_names0(response.data.msg[0].author_name);
    setauthor_names1(response.data.msg[1].author_name);
    setauthor_names2(response.data.msg[2].author_name);
    setauthor_names3(response.data.msg[3].author_name);
    setpublish_times0(response.data.msg[0].publish_time);
    setpublish_times1(response.data.msg[1].publish_time);
    setpublish_times2(response.data.msg[2].publish_time);
    setpublish_times3(response.data.msg[3].publish_time);
    setSimpleContainer(true);

  })
  .catch((error) => {
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';


    setSimpleContainer(false);
    setblogsIDs0('');
    settitles0('');
    setcontents0('');
    setauthor_names0('');
    setpublish_times0('');
*/}

{/*    setSimpleContainer(false);
    setblogsIDs0('');
    setblogsIDs1('');
    setblogsIDs2('');
    setblogsIDs3('');
    settitles0('');
    settitles1('');
    settitles2('');
    settitles3('');
    setcontents0('');
    setcontents1('');
    setcontents2('');
    setcontents3('');
    setauthor_names0('');
    setauthor_names1('');
    setauthor_names2('');
    setauthor_names3('');
    setpublish_times0('');
    setpublish_times1('');
    setpublish_times2('');
    setpublish_times3('');
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';
 

  })*/}

  {/* MessageBoxChange1 = MessageBox();MessageBoxChange1 = null;
  if (SimpleContainerT) {
    MessageBoxChange0 = MessageBox(blogsIDs0,titles0,contents0,author_names0,publish_times0);
    MessageBoxChange1 = MessageBox(blogsIDs1,titles1,contents1,author_names1,publish_times1);
    MessageBoxChange2 = MessageBox(blogsIDs2,titles2,contents2,author_names2,publish_times2);
    MessageBoxChange3 = MessageBox(blogsIDs3,titles3,contents3,author_names3,publish_times3);

  }else{
    MessageBoxChange0 = null;
  }*/}



  return (
    <div>
    <React.Fragment>
      <Container maxWidth="sm">
        <Typography style={{  height: '576px',width:'857px',position:'absolute', left:'calc(5% + 28px)',top:"103px"}} >
          {MessageBox(page,0,history)}
          {MessageBox(page,1)}
          {MessageBox(page,2)}
          {MessageBox(page,3)}
        page:{page}
        </Typography>
      </Container>
    </React.Fragment>
    </div>
  );

}

export function PaginationControlled(history) {
  const classes = PaginationControlleduseStyles();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={classes.root}>
      {SimpleContainer(page,history)}
      <div style={{position:'absolute', left:'616px',top:"675px"}}><Pagination count={parseInt((total_number-1)/4)+1} page={page} onChange={handleChange} /></div>
    </div>
  );
}



export function MessageBox(page,index,history) {
  const [SimpleContainerT, setSimpleContainer] = useState(false);
  const [blogsIDs, setblogsIDs] = React.useState('');
  const [titles, settitles] = React.useState('');
  const [contents, setcontents] = React.useState('');
  const [author_names, setauthor_names] = React.useState('');
  const [publish_times, setpublish_times] = React.useState('');
  const thepage = 'http://101.200.227.216:8080/api/blog?page='+page+'&blog_num=4';
  axios({
    method: 'get',
    url: thepage,
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    myselfState = 1;
    setblogsIDs(response.data.msg[index].blog_id);
    settitles(response.data.msg[index].title);
    setcontents(response.data.msg[index].content);
    setauthor_names(response.data.msg[index].author_name);
    setpublish_times(response.data.msg[index].publish_time);
    setSimpleContainer(true);
  })
  .catch((error) => {
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';
    setSimpleContainer(false);
    setblogsIDs('');
    settitles('');
    setcontents('');
    setauthor_names('');
    setpublish_times('');
  })

  return (
    <div className="MessageBox" onClick={()=>history.push("/Home/HomePage/"+blogsIDs)}>
      <Route exact path="/Home/HomePage/:id" component={HomePagePosting}></Route>
      <Route exact path={`/Home/HomePage/${blogsIDs}`}><HomePagePosting blogID={blogsIDs}/></Route>

      <div className="MessageBoxHeader">
        {titles}
      </div>
      <div className="MessageBoxMainText">
        {contents}
      </div>    
      <div className="MessageBoxTopDot"/>
      <div className="MessageBoxTime">
        {publish_times}
      </div>
      <div className="MessageBoxPoster">    
        <div className="MessageBoxName">
          {author_names}
        </div>    
        <div className="MessageBoxCompanyName">
         
        </div>    
      </div>



    </div>
  );
}

export default withRouter(FirstPage);




