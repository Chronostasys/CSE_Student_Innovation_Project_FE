import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
import qs from 'qs';

import './myhomeSpace.css';

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





class SimpleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.NameChangeClick = this.NameChangeClick.bind(this);
    this.nameHandleChange = this.nameHandleChange.bind(this);
    this.sloganHandleChange = this.sloganHandleChange.bind(this);

    this.state = {      
      NameChangeStage: false, 
      name: 'Cat in the Hat',
      slogan: 'slogan',
      NameJudge: false,
    };
  }

  nameHandleChange(e){
    const name = e.target.value;
    this.setState({name: {name}})
  };
  sloganHandleChange(e){
    const slogan = e.target.value;
    this.setState({slogan: {slogan}})
    console.log(this.state.slogan);
  };
  NameChangeClick() {
    this.setState({NameChangeStage: true});  
  }

  render() {
    const TextFielduseStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));    

    let myhomeSpaceNameChangeBox;
    if (this.state.NameChangeStage && this.state.NameJudge) {
      myhomeSpaceNameChangeBox =        
        <div className="myhomeSpaceNameBox">
          <form className={TextFielduseStyles.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="outlined-name"
                label="Name"
                onChange={this.nameHandleChange}
                variant="outlined"
                size="small" 
                style={{position:"relative",left:"70px",bottom:"0px",width:"32ch"}}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="个人slogan"
                onChange={this.sloganHandleChange}
                variant="outlined"
                size="small" 
                style={{position:"relative",left:"70px",top:"10px",width:"48ch"}}
              />
            </div>
          </form> 
          <div className="myhomeSpaceNameChangeFinishButton"><CheckIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
          <div className="myhomeSpaceNameChangeCloseButton"><CloseIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
        </div>
    } else if (this.state.NameChangeStage && !this.state.NameJudge){
      myhomeSpaceNameChangeBox =        
        <div className="myhomeSpaceNameBox">
          <form className={TextFielduseStyles.root} noValidate autoComplete="off">
            <div>
              <TextField
                error
                id="outlined-name"
                label="需由4-16位数字、字母或下划线组成"
                onChange={this.nameHandleChange}
                variant="outlined"
                size="small"
                style={{position:"relative",left:"70px",bottom:"0px",width:"32ch"}}
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="个人slogan"
                onChange={this.sloganHandleChange}
                variant="outlined"
                size="small" 
                style={{position:"relative",left:"70px",top:"10px",width:"48ch"}}
              />
            </div>
          </form> 
          <div className="myhomeSpaceNameChangeFinishButton"><CheckIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
          <div className="myhomeSpaceNameChangeCloseButton"><CloseIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
        </div>


    }else{
      myhomeSpaceNameChangeBox =        
      <div className="myhomeSpaceNameBox">
        <div className="myhomeSpaceNameBoxName">Emilee Simchenko</div>
        <div className="myhomeSpaceNameBoxSignature">个人slogan</div>
        <div className="myhomeSpaceNameChangeButton" onClick={this.NameChangeClick}><EditIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
      </div>
    }

  return (
    <div className="myhomeSpaceBackgroundBlack">
      <div className="myhomeSpaceBackgroundWhite">
        {myhomeSpaceNameChangeBox}
        <div className="myhomeSpaceOrganizationBox">
          <div className="myhomeSpaceOrganizationBoxHeader">
            <PeopleAltIcon style={{fontSize:"32"}}/>
            <div className="myhomeSpaceOrganizationBoxHeaderText">我创建的组织</div>
          </div>
          <div className="myhomeSpaceOrganizationBoxList">
            {myhomeSpaceOrganizationProject()}
            {myhomeSpaceOrganizationCompany()}
            {myhomeSpaceOrganizationProject()}
            {myhomeSpaceOrganizationCompany()}
            {myhomeSpaceOrganizationProject()}
            {myhomeSpaceOrganizationCompany()}
            {myhomeSpaceOrganizationProject()}
            {myhomeSpaceOrganizationCreate()}
          </div>
        </div>
      </div>

    </div>
    );
  }
}



export function myhomeSpaceOrganizationProject(props) {
  return (
    <div className="myhomeSpaceOrganizationProject">
      <div className="myhomeSpaceOrganizationProjectImg"></div>
      <div className="myhomeSpaceOrganizationProjectName">xxxx项目</div>
      <div className="myhomeSpaceOrganizationProjectMyPositon"></div>
    </div>
  );
}
export function myhomeSpaceOrganizationCompany(props) {
  return (
    <div className="myhomeSpaceOrganizationCompany">
      <div className="myhomeSpaceOrganizationCompanyImg"></div>
      <div className="myhomeSpaceOrganizationCompanyName">xxxx公司</div>
      <div className="myhomeSpaceOrganizationCompanyMyPositon"></div>
    </div>
  );
}
export function myhomeSpaceOrganizationCreate(props) {
  return (
    <div className="myhomeSpaceOrganizationCreate">
      <div className="myhomeSpaceOrganizationCreateTextBox">
        <AddCircleOutlineIcon  style={{fontSize:"28"}}/>
        <div className="myhomeSpaceOrganizationCreateText">申请加入组织</div>
      </div>  
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

