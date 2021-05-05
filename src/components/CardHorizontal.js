import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import EventIcon from "@material-ui/icons/Event";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import noImg from "../assets/noimg.png";
import { GridContext } from "../App";

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    width: 800,
    maxHeight: 400,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: '0.5rem'
  },
  media: {
    height: 150,
    width: 250,
    borderRadius: '15px'

  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "flex",
    padding: "0.5rem",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  switch: {
    width: "90%",
    maxWidth: "90%",
    display: "flex",
    flexDirection: "row",
  },
});

const Horizontal = (props) => {
  const context = useContext(GridContext);
  const classes = useStyles();

  //const isGrided = context.isGrid ? classes.switch : null
  let date = new Date(props.on_sale_date.value).toISOString().substring(0, 10);
  //className={`${classes.root} ${context.isGrid ? classes.switch : null}`}
  console.log("Horizontal")
  return (
    <Card
      className={classes.root} 
    >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={
            props &&
            props.images &&
            props.images.standard &&
            props.images.standard.url
              ? props.images.standard.url
              : noImg
          }
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Box className={classes.divBottom}>
        <Typography
          gutterBottom
          variant="subtitle1"
          className={classes.wrapIcon}
        >
          <EventIcon style={{ fontSize: 25, marginRight: 5 }} /> {date}
        </Typography>

        <Typography
          gutterBottom
          variant="subtitle1"
          className={classes.wrapIcon}
        >
          <LocationOnIcon style={{ fontSize: 25, marginRight: 5 }} />{" "}
          {props.venue.location.address.country} {props.venue.location.address.address} 
        </Typography>
      </Box>
    </Card>
  );
};

export default Horizontal;
