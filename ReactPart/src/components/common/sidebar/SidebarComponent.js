import React from 'react';
import { withRouter ,Link} from "react-router-dom";
import { SidebarData } from './SideBarData';
// import './sidebar.component.css';
import { Button } from '@mui/material';

// imported latter for toogling
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ProductionQuantityLimits from '@mui/icons-material/ProductionQuantityLimits';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import ClickAwayListener from '@mui/material/ClickAwayListener';

//Data mapping
const titles = SidebarData.map(item => item.title);
const path = SidebarData.map(item => item.path);
const icon = SidebarData.map(item => item.icon);

  //logout functionality
const Logout = (props) => {
  // console.log("logouts props>>",props)
  localStorage.clear();
  props.history.push('/');
}
  

function SideBarItem(props) {

    const [state, setState] = React.useState({
    left: false,
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

   // Product list drawer styles and const here
   const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };


    const list = (anchor) => (
      <Box
        backgroundColor="#1b4332"
        color="ActiveBorder"
      sx={{ width: 250 ,marginTop:6}}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="close drawer"
            sx={{ mr: 2, left: "80%" }}
            onClose={toggleDrawer(anchor, false)}
          >
        <CancelIcon sx={{justifyContent:"right"}} />
          </IconButton>
      <Divider />
      <List>
          {/* product add view edit and delete menus here */}
          <ClickAwayListener onClickAway={handleClickAway} >
              <Box backgroundColor="#1b4332">
                <ListItem>
                  <Button  color="inherit" startIcon={<ProductionQuantityLimits />} onClick={handleClick} sx={{width:"100vw",justifyContent:"left"}}>
                    Product
                  </Button>
                </ListItem>
              {open ? (
              <Box backgroundColor="#2d6a4f" color="ActiveBorder">
                  <ListItem>
                    <Link to="/product" style={{textDecoration:"none", color:"ActiveBorder"}}>
                      <Button  color="inherit" startIcon={<ProductionQuantityLimits />} sx={{width:"100vw",justifyContent:"left"}}>
                      Add Product</Button>
                    </Link>
                    
                  </ListItem>
                  <ListItem>
                    <Link to="/view_product" style={{textDecoration:"none", color:"ActiveBorder"}}>
                      <Button  color="inherit" startIcon={<ProductionQuantityLimits />} sx={{width:"100vw",justifyContent:"left"}}>
                      View Product</Button>
                    </Link>
                  </ListItem>
              </Box>
              ) : null}
            </Box>
          </ClickAwayListener>
      {/* </List>
      <List> */}
          
        {
            titles.map((item, i) => {
                  return (
                    <ListItem  key={item} color="inherit">
                <Link to={path[i]} style={{textDecoration:"none",color:"ActiveBorder"}}>
                  <Button   color="inherit" startIcon={icon[i]}  sx={{display:"flex",flexDirection:"row",width:"100vw",justifyContent:"flex-start"}} >
                    {titles[i]}
                  </Button>
                </Link>
              </ListItem>
              )
          })
          }
          <ListItem >
            <Button color="warning" onClick={()=>Logout(props)} startIcon={<LogoutIcon />} sx={{width:"100vw",justifyContent:"left"}}>Logout</Button>
        </ListItem>
      </List>
    </Box>
  );

  const sidebar= props.isLoggedIn ?(<div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(anchor, true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
          </div>):(<Button color="inherit" href="/"><HomeIcon  /></Button>)

  return sidebar;
}

export const SideBar = withRouter(SideBarItem) ;