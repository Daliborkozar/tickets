import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox"
import FormGroup from '@material-ui/core/FormGroup';



const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "#3F4550",
    padding: "1rem",
    height: "100%",
    color: "white",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  AccTitleComponent: {
    backgroundColor: "#EFEEF0",
  },
}));

const SimpleAccordion = (props) => {
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="inherit">
        Filter Events
      </Typography>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          className={classes.AccTitleComponent}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            Filter by Categories
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <FormGroup column='true'>
            {props.cat ? props.cat.map(item => (
                <FormControlLabel key = {item.id}
                control={<Checkbox   onChange={props.changeCategory} value={item.id} />}
                label={item.name}
              /> 
            )) : null}
        </FormGroup>
          {/* <FormControl component="fieldset">
            <FormLabel component="legend">Category type</FormLabel>
            <RadioGroup
              aria-label="Category type"
              value={props.category}
              onChange={props.changeCategory}
            >
              {props.cat
                ? props.cat.map((item) => (
                    <FormControlLabel
                      value={item.name}
                      control={<Radio />}
                      label={item.name}
                      key={item.id}
                    />
                  ))
                : null}
            </RadioGroup>
          </FormControl> */}
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          className={classes.AccTitleComponent}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Filter by Country</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormLabel component="legend">Country</FormLabel>
            <RadioGroup value={props.country} onChange={props.changeCountry}>
              <FormControlLabel
                value="germany"
                control={<Radio />}
                label="Germany"
              />
              <FormControlLabel
                value="spain"
                control={<Radio />}
                label="Spain"
              />
              <FormControlLabel
                value="poland"
                control={<Radio />}
                label="Poland"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded={true}>
        <AccordionSummary
          className={classes.AccTitleComponent}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Sorting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl component="fieldset">
            <FormLabel component="legend">Sort</FormLabel>
            <RadioGroup value={props.sorting} onChange={props.changeSorting}>
              <FormControlLabel
                value="eventname"
                control={<Radio />}
                label="Event Name"
              />
              <FormControlLabel
                value="popularity"
                control={<Radio />}
                label="Popularity"
              />
              <FormControlLabel
                value="eventdate"
                control={<Radio />}
                label="Event Date"
              />
            </RadioGroup>
          </FormControl>
        </AccordionDetails>
       
      </Accordion>
      
    </div>
  );
};

export default SimpleAccordion;
