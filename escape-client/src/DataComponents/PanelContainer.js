import {useState, useLayoutEffect} from 'react';
import {Link} from 'react-router-dom';

import NewActivityForm from './NewActivityForm';
import Itinerary from '../PresoComponents/Itinerary.js';
import WalletShow from '../PresoComponents/WalletShow.js';
import NewBudgetForm from './NewBudgetForm.js';
// import '../tripPlanner.css';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


// export default function TabPanel(props) {
//     const {children, value, index, ...other} = props;

//     // const classes = useStyles();
//     const [value, setValue] = useState(0);
//     const [tripState, setTripState] = useState();
//     const [userState, setUserState] = useState();
//     // const [modalStyle] = useState(getModalStyle());
//     const [openActivity, setOpenActivity] = useState(false);
//     const [openTravel, setOpenTravel] = useState(false);
//     const [openWallet, setOpenWallet] = useState(false);


//     const handleOpen = (evt) => {
//       if(evt.target.innerText === "Add New Activity") {
//         setOpenActivity(true)
//       } else if(evt.target.innerText === "Add New Travel") {
//         setOpenTravel(true)
//       } else if(evt.target.innerText === "Add New Budget") {
//         setOpenWallet(true);
//       }
//     };

//     const handleClose = (evt) => {
//       if(evt.target.className === "closeActivity") {
//         setOpenActivity(false)
//       } else if(evt.target.className === "closeTravel") {
//         setOpenTravel(false)
//       } else setOpenWallet(false);
//     };

//----> TODO: Add modal functionality for forms

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


    /*######################################
    ######################################
    LOGIC
    ######################################
    ######################################*/

    const [value, setValue] = useState(0);
    const [tripState, setTripState] = useState();
    const [userState, setUserState] = useState();
  
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
      <div>
        <AppBar position="static" backgroundColor="white">
          <Tabs color="#c6d7b9" value={value} onChange={handleChange} aria-label="scrollable force tabs example">
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
              <div key={activity._id}>
                  <h2>{activity.name}</h2>
                  <p>{activity.location}</p>
                  <Button>
                    <Link to={`/activity/${activity._id}`}>See Detail</Link>
                  </Button>
              </div>
              )
            })}
           <button>
               Add New Activity
           </button>
        </TabPanel>

        {/*################## TRAVEL ##################*/}
        <TabPanel value={value} index={2}>
          {tripState && tripState.travel_ids.map((travel) => {
            return(
              <div key={travel._id}>
                  <h2>{travel.name}</h2>
                  <p>{travel.starting_location}</p>
                  <p>{travel.ending_location}</p>
                  <button>
                    <Link to={`/travel/${travel._id}`}>See Detail</Link>
                  </button>
              </div>
            )
          })}
          <button >
              Add New Travel
          </button>
        </TabPanel>

        {/*################## WALLET ##################*/}
        <TabPanel value={value} index={3}>
          <div > 
            <WalletShow trip={tripState} user={userState}/> 
            <button>
              Add New Budget
            </button>
            <NewBudgetForm trip={tripState} user={userState} />
          </div>
        </TabPanel>

        {/*################## PHOTOS ##################*/}
        <TabPanel value={value} index={4}>
          <div> 
            <h2>Photos</h2>
          </div>
        </TabPanel>
      </div>
    );
  }
