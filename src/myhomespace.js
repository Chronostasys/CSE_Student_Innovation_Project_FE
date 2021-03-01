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
    this.NameChangeCloseClick = this.NameChangeCloseClick.bind(this);
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
  NameChangeCloseClick() {
    this.setState({NameChangeStage: false});  
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
          <div className="myhomeSpaceNameChangeCloseButton" onClick={this.NameChangeCloseClick}><CloseIcon color="action" style={{fontSize:"20",position:"relative",left:"5px",top:"5px"}}/></div>
        </div>

    } else {
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
            <CreateOrganization />
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

const CreateOrganizationUseStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export function CreateOrganization() {
  const CreateOrganizationUseStylesclasses = CreateOrganizationUseStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="myhomeSpaceOrganizationCreate" onClick={handleToggle}>
        <div className="myhomeSpaceOrganizationCreateTextBox">
          <AddCircleOutlineIcon  style={{fontSize:"28"}}/>
          <div className="myhomeSpaceOrganizationCreateText">申请创建组织</div>
        </div>  
      </div>

      <Backdrop className={CreateOrganizationUseStylesclasses.backdrop} open={open}>
        <CreateOrganizationPage />
        <div className="CreateOrganizationPageBack" onClick={handleClose}><CloseIcon fontSize="large"/></div>
      </Backdrop>
    </div>
  );
}

class CreateOrganizationPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      };
  }

  render() {

    return (
      
      <div className="CreateOrganizationPage">
        <div className="CreateOrganizationPageHeader">
          <GroupAddIcon color="action" style={{fontSize:"34",position:"relative",top:"11px"}}/>
          <div className="CreateOrganizationPageHeaderText">创建组织</div>
        </div>
        <div className="CreateOrganizationPageText1">基本信息</div>
        <div className="CreateOrganizationPageText2">联系方式</div>
        <div className="CreateOrganizationPageInputs">
          <CreateOrganizationPageInputs />
        </div>
      </div>
      
    );
  }
}
export function CreateOrganizationPageInputs() {

  const SelectclassesuseStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 195,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
    
  const Selectclasses = SelectclassesuseStyles();
  const [type, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
  <div>        
    <div className="TextFieldOrganizationName"><TextField label="组织名称"/></div>

    <div className="TextFieldOrganizationTypr" style={{position:"relative",right:"8px",bottom:"5px"}}>
      <FormControl className={Selectclasses.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">组织类型</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={type}
          onChange={handleChange}
          label="组织类型"
        >
          <MenuItem value={1}>大创项目</MenuItem>
          <MenuItem value={2}>校园企业</MenuItem>
        </Select>
      </FormControl>
    </div>
    <div className="CreateOrganizationPageInputsImg">
      <AddCircleOutlineIcon style={{fontSize:"26",position:"absolute",left:"105px",top:"200px"}}/>
      <div className="CreateOrganizationPageInputsImgText">上传首图</div>
    </div>
    <div className="TextFieldOrganizationTextFieldBox"><TextField label="邮箱"/></div>
    <div className="TextFieldOrganizationTextFieldBox"><TextField label="固定电话"/></div>
    <div className="TextFieldOrganizationTextFieldBox"><TextField label="移动电话"/></div>

    <Button 
      variant="contained" 
      startIcon={<CheckIcon />} 

      style={{backgroundColor:"#263B64",color:"white",width:"133px",height:"40px",position:"absolute",top:"520px",left:"205px"}}
    >
      创建组织
    </Button>
    
    
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

