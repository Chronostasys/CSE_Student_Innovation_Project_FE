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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from 'axios';
import qs from 'qs';

import './manageOrganization.css';

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

    this.state = {      
      NameChangeStage: false, 
      name: 'Cat in the Hat',
      slogan: 'slogan',
      NameJudge: false,
    };
  }


  render() {

  return (
    <div className="manageOrganizationBackgroundBlack">
      <div className="manageOrganizationBackgroundWhite">

        <div className="manageOrganizationOrganizationBox">
          <div className="manageOrganizationOrganizationBoxHeader">我创建的组织</div>
          <div className="manageOrganizationOrganizationBoxList">
            
          </div>
        </div>
      </div>

    </div>    );
  }
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

