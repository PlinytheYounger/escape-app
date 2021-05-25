import './css/header.css';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const StyledMenu = withStyles({
    // paper: {
    //   border: '1px solid #d3d4d5',
    // },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

export default function Header(props) {
    /*######################################
    ######################################
    STYLING
    ######################################
    ######################################*/
    const testStyle = {
        backgroundColor: "#c6d7b9",
        color: "#5e8d5a"
    }

    const titleTheme = {
        fontSize: "32px",
        fontWeight: "bold"
    }

    const menuFont = {
        fontFamily: "Montserrat",
    }

    /*######################################
    ######################################
    LOGIC
    ######################################
    ######################################*/

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    // Ternary conditional to update the header based on whether a user is logged in or not
    let updateNav = props.user ? 
        <div>
        <StyledMenuItem>
            <Link className="linkTheme" to="" > 
                <ListItemText style={menuFont}> Hi, {props.user.name}</ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="/trip" user={props.user}>
                <ListItemText style={menuFont}>Start New Trip</ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to={`/user/${props.user._id}`}>
            <ListItemText style={menuFont}>Profile</ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="" onClick={props.handleLogout}> 
            <ListItemText style={menuFont}>Logout </ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="/">
            <ListItemText style={menuFont}>Explore</ListItemText>
            </Link>
        </StyledMenuItem>
        </div>
        :
        <div>
        <StyledMenuItem>
            <Link className="linkTheme" to="/new_user/signup"> 
                <ListItemText style={menuFont}>Signup </ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="/login"> 
                <ListItemText style={menuFont}>Login </ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="/trip">
                <ListItemText style={menuFont}>Trip Planner</ListItemText>
            </Link>
        </StyledMenuItem>
        <StyledMenuItem>
            <Link className="linkTheme" to="/">
                <ListItemText style={menuFont}>Explore</ListItemText>
            </Link>
        </StyledMenuItem>
        </div>

    /*######################################
    ######################################
    RETURN
    ######################################
    ######################################*/


    return (
        <header className="barTheme" style={testStyle}>
            <AppBar position="static" color="inherit" style={testStyle}>
                <Toolbar className="barTheme" style={testStyle}>
                    <div className="titleName">
                        <Link className="linkTheme" to="/">
                            <h2 style={titleTheme}>Escape</h2>
                        </Link>
                    </div>
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="menu"                             
                                aria-controls="customized-menu"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleClick}>
                            <MenuIcon fontSize="large" style={testStyle}/>                    
                        </IconButton>
                        <StyledMenu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className="navBar"
                        >
                            {updateNav}
                        </StyledMenu>
                    </div>
                </Toolbar>
            </AppBar>
        </header>
    )
}