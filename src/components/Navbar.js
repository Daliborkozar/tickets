import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import ViewListIcon from "@material-ui/icons/ViewList";
import Box from "@material-ui/core/Box";
import { GridContext } from "../App";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Drawer from "@material-ui/core/Drawer";
import Accordion from "./Accordion";
import AutocompleteVenue from './AutocompleteVenue'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    background: "white",
  },
  iconCenter: {
    margin: "0 auto",
  },
  navContainer: {
    display: "flex",
  },
  dr: {
    width: "100%",
  },
  paper: {
    width: 390,
    background: "#3F4550",
  },
}));

export default function ButtonAppBar(props) {
  const context = useContext(GridContext);
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  
 
  console.log(context.events);
  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.navContainer}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
            onClick={() => setDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.iconCenter}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
              onClick={() => context.setIsGrid(true)}
            >
              <AppsIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
              onClick={() => context.setIsGrid(false)}
            >
              <ViewListIcon fontSize="large" />
            </IconButton>
          </Box>
          <div>
            <Autocomplete
              multiple
              id="tags-standard"
              options={context.city}
              getOptionLabel={(option) => option.name}
              style={{ width: 300, margin: "0 5rem", display: "inline-block" }}
              onChange={context.cityChangehandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search for country"
                  
                />
              )}
            />
     
          </div>
          <div>
            <AutocompleteVenue />
     
          </div>
          
        </Toolbar>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={drawer}
        onClose={() => setDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        <Accordion />
      </Drawer>
    </div>
  );
}
