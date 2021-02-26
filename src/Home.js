import React,{ useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Height } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
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

import axios from 'axios';
import qs from 'qs';

import './index.css';
import FirstPage from './FirstPage';
import MyPosting from './MyPosting';


let myselfState = 0;
let myselfName = '';
let myselfEmail = '';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

class HomePageFrontName extends React.Component {
  constructor(props) {
    super(props);
    this.NameClick = this.NameClick.bind(this);
    this.state = {      
      NameClick: 0, 
    };
  }

  NameClick() {
    const theNameClick = this.state.NameClick;
    this.setState({NameClick: !theNameClick});  
  }

  render() {
    let HomePageFrontNameShowBox;
    if ( this.state.NameClick ) {
      HomePageFrontNameShowBox = HomePageFrontNameHiddenBox(this.props.history);
    }
  return (
    <div>
      <a className="HomePageFrontName" onClick={this.NameClick}>
        {this.props.myselfName}
      </a>
      {HomePageFrontNameShowBox}
    </div>
    );
  }
}

export function HomePageFrontNameHiddenBox(history) {
  return (
    <div className="HomePageFrontNameHiddenBox">
      <a id="HomePageFrontNameHiddenBoxExit"
        onClick={() => {window.localStorage.removeItem('token');history.go(0)}}
      >
        退出登录
      </a>
    </div>
  );
}

export function HomePageFrontNameImage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
    </div>
  );
}

export function SimpleTabs(props) {
  let HomePageFrontNameHiddenBox;
  const [HomePageFrontNameHiddenBoxT, setHomePageFrontNameHiddenBox] = useState(false);
  const [myselfNameGet, setmyselfName] = useState('');

  axios({
    method: 'get',
    url: 'http://101.200.227.216:8080/api/auth/myself',
    headers: {
      token: localStorage.getItem('token'),
    },
  })
  .then((response) => {
    myselfState = 1;
    myselfName = response.data.name;
    myselfEmail = response.data.email;
    setmyselfName(response.data.name);
    setHomePageFrontNameHiddenBox(true);
  })
  .catch((error) => {
    myselfState = 0;
    myselfName = '';
    myselfEmail = '';
    setHomePageFrontNameHiddenBox(false);
    setmyselfName('');
  })
  if (HomePageFrontNameHiddenBoxT) {
    HomePageFrontNameHiddenBox = <HomePageFrontName myselfName={myselfNameGet} history={props.history}/>;
  } else {
    HomePageFrontNameHiddenBox = null;
  }

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const styleTabs = {
    background: '#263B64',
    height: '64px',
    top: '0',
  };
  const styleTab1 = {
    left: '205px',
    top: '10px',
  };
  const styleTab2 = {
    left: '235px',
    top: '10px',
  };
  const styleTab3 = {
    left: '265px',
    top: '10px',
  };

  return (
    <div className={classes.root}>

      <div className="HomeHeaderLogo" />
      <AppBar position="static" style={styleTabs}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" style={styleTabs}>
          <Tab label="首页" {...a11yProps(0)} style={styleTab1} onClick={()=>props.history.push("/home/homePage")}/>
          {/*<Tab label="校园企业" {...a11yProps(1)} style={styleTab2} onClick={()=>props.history.push("/Home/SchoolCompany")}/>
          <Tab label="大创项目" {...a11yProps(2)} style={styleTab3} onClick={()=>props.history.push("/Home/Projects")}/>*/}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <FirstPage />
      </TabPanel>
      {/*<TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>*/}
      <Switch>
        <Route exact path="/home/homePage"></Route>
        {/*<Route exact path="/Home/SchoolCompany">2</Route>
        <Route exact path="/Home/Projects">3</Route>*/}
        <Route exact path="/"></Route>

      </Switch>

      {HomePageFrontNameHiddenBox}
      
      {/*<div id="HomePageFrontNameImage"><HomePageFrontNameImage style={{opacity:'1'}}/></div>*/}
      


    </div>

  );
}

export default withRouter(SimpleTabs);

