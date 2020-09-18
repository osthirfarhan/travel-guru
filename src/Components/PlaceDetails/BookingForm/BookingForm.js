import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './BookingForm.css'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


const BookingForm = () => {
  const classes = useStyles();
  
  return (
    <div className='bookingForm'>
      <div className='bookingForm__place'>
        <h5>Origin</h5>
        <input type='text'/>
     </div>
     <div className='bookingForm__place'>
       <h5>Destination</h5>
      <input type='text'/> 
     </div>

      
     <div className='bookingForm__date'>
     <TextField
    id="datetime-local"
    label="From"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
   />
    <TextField
    id="datetime-local"
    label="To"
    type="datetime-local"
    defaultValue="2017-05-24T10:30"
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />

     </div>
      <button>Start Booking</button>

    </div>
  );
};

export default BookingForm;