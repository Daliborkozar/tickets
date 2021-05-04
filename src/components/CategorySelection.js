import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const RadioButtonsGroup = (props) => {
  const [country, setCountry] = useState(' ');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Country</FormLabel>
      <RadioGroup value={country} onChange={handleChange}>
        <FormControlLabel value="eventname" control={<Radio />} label="Event Name" />
        <FormControlLabel value="popularity" control={<Radio />} label="Popularity" />
        <FormControlLabel value="eventdate" control={<Radio />} label="Event Date" />
      </RadioGroup>
    </FormControl>
  );
}

export default RadioButtonsGroup