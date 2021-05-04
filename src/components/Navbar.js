import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppsIcon from "@material-ui/icons/Apps";
import ViewListIcon from "@material-ui/icons/ViewList";
import Box from "@material-ui/core/Box";
import { GridContext } from "../App";

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
}));

export default function ButtonAppBar(props) {
  const context = useContext(GridContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.iconCenter}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
              onClick={() => context.setIsGrid(false)}
            >
              <AppsIcon fontSize="large" />
            </IconButton>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="primary"
              aria-label="menu"
              onClick={() => context.setIsGrid(true)}
            >
              <ViewListIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
