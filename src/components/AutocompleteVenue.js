import React, { useContext} from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {GridContext} from '../App'

import TextField from '@material-ui/core/TextField';

const AutocompleteVenue = () => {
    const context = useContext(GridContext);
    return (
        <Autocomplete
              multiple
              autoSelect
              id="tags-standard"
              options={context.venueTags}
              getOptionLabel={(option) => option.name}
              style={{ width: 300, margin: "0 5rem", display: "inline-block" }}
              onChange={context.venueSelectHandler}
             
              getOptionSelected={(option, value) => option.name === value.name }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search for country"
                  onChange={context.inputVenue}
                  value={context.venueInput}
                />
              )}
            />
    )
}

export default AutocompleteVenue
