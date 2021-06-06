import {useState, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';

import NewActivityForm from './NewActivityForm';
import Itinerary from '../PresoComponents/Itinerary.js';
import WalletShow from '../PresoComponents/WalletShow.js';
import NewBudgetForm from './NewBudgetForm.js';
import NewTravelForm from './NewTravelForm';
import NewExpenseForm from './NewExpenseForm';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
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
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  
  export default function SimpleTabs(props) {
    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/
    const linkStyle = {
      textDecoration: "none",
      color: "black",
    }

    const listStyle = {
      border: "1px #c6d7b9 solid"
    }

    const containerStyle = {
      height: "100%",
      width: "50%"
    }

    /*######################################
    ######################################
    LOGIC
    ######################################
    ######################################*/

    const [value, setValue] = useState(0);
    const [tripState, setTripState] = useState();
    const [userState, setUserState] = useState();
    const [openActivity, setOpenActivity] = useState(false);
    const [openTravel, setOpenTravel] = useState(false);
    const [openWallet, setOpenWallet] = useState(false);

    const handleOpen = (evt) => {
      console.log(evt.target.innerText)
      if(evt.target.innerText === "Add New Activity") {
        setOpenActivity(true)
      } else if(evt.target.innerText === "Add New Travel") {
        setOpenTravel(true)
      } else if(evt.target.innerText === "Add New Budget") {
        setOpenWallet(true);
      }
    };

    const handleClose = (evt) => {
      if(evt.target.className === "closeActivity") {
        setOpenActivity(false)
      } else if(evt.target.className === "closeTravel") {
        setOpenTravel(false)
      } else setOpenWallet(false);
    };
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    async function getTripProfile() {
      setTripState(props.trip);
      setUserState(props.user);
    }

    useLayoutEffect(() => {
        getTripProfile();
    }, [props.trip, props.user]);
  
    return (
      <div style={containerStyle}>
        <AppBar position="static" backgroundColor="white" color="#c6d7b9">
          <Tabs color="#c6d7b9" value={value} onChange={handleChange} aria-label="scrollable force tabs example" variant="scrollable" scrollButtons="on" indicatorColor="#5e8d5a">
            <Tab color="#c6d7b9" label="Itinerary" {...a11yProps(0)} />
            <Tab color="#c6d7b9" label="Activities" {...a11yProps(1)} />
            <Tab color="#c6d7b9" label="Travel" {...a11yProps(2)} />
            <Tab color="#c6d7b9" label="Budget" {...a11yProps(3)} />
            <Tab color="#c6d7b9" label="Photos" {...a11yProps(4)} />
          </Tabs>
        </AppBar>


        <TabPanel value={value} index={0}>
          <Itinerary />
        </TabPanel>

        {/*################## ACTIVITY ##################*/}
        <TabPanel value={value} index={1}>
          {tripState && tripState.activity_ids.map((activity) => {
            return(
              <div style={listStyle} key={activity._id}>
                  <h3>{activity.name}</h3>
                  <p>{activity.location}</p>
                  <Button>
                    <Link style={linkStyle} to={`/api/activity/${activity._id}`}>See Detail</Link>
                  </Button>
              </div>
              )
            })}
          <div>
            <NewActivityForm handleClose={handleClose} {...props}/>
          </div>
        </TabPanel>

        {/*################## TRAVEL ##################*/}
        <TabPanel value={value} index={2}>
          <div>
            <NewTravelForm handleClose={handleClose} {...props}/>
          </div>
          {tripState && tripState.travel_ids.map((travel) => {
            return(
              <div style={listStyle} key={travel._id}>
                  <h3>{travel.name}</h3>
                  <p>{travel.starting_location}</p>
                  <p>{travel.ending_location}</p>
                  <Button>
                    <Link style={linkStyle} to={`/api/travel/${travel._id}`}>See Detail</Link>
                  </Button>
              </div>
            )
          })}
        </TabPanel>

        {/*################## WALLET ##################*/}
        <TabPanel value={value} index={3}>
          <div>
              <NewBudgetForm trip={tripState} user={userState} />
          </div>
        </TabPanel>

        {/*################## PHOTOS ##################*/}
        <TabPanel value={value} index={4}>
          <div> 
            <h3>Photos</h3>
          </div>
        </TabPanel>
      </div>
    );
  }
