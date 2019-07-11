import React, {useReducer, useState} from 'react';
import moment from 'moment';
import {reducer, initialState} from './appointments.reducer';
import logo from './logo.svg';
import './App.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AppointmentForm({existingAppointments, onSubmitSucess}){

  console.log("existing app ", existingAppointments);

  const [formErrors, setFormErrors] = useState({
    date: {hasError: false},
    startTime: {hasError: false},
    endTime: {hasError: false}
  });
  const [formData, setFormData] = useState({
    date: moment().format('MM/DD/YYYY').toString() ,
    startTime: moment().format('HH:MM').toString(),
    endTime: moment().add(1, 'hours').format('HH:MM').toString()
  });

  const dateHelpText = formErrors.date.hasError ? "Please select a future date" : "";
  const startTimeHelpText = formErrors.startTime.hasError ? "Please select a different start time" : "";
  const endTimeHelpText = formErrors.endTime.hasErroror ? "Please select a different end time" : "";

  function handleDateChange(e){
    console.log('e', e.target.value);
    if(moment(e.target.value).isSameOrAfter(moment().format('YYYY-MM-DD'))){
      setFormData({...formData, date: e.target.value});
      setFormErrors({ ...formErrors, date : {hasError : false}});
    } else {
      setFormErrors({...formErrors, date : {hasError : true}});
    }
  }

  function handleStartTimeChange(e){
    // loop through all existing app
      // if date matches
        // if start time falls between start and end - setform data
        // else - set error

    let startTimeData = e.target.value;
    var format = 'hh:mm:ss';
    startTimeData = moment(startTimeData,format);
    
    existingAppointments.map(appointment => {
      // console.log('asdfadsf',appointment.date, moment(formData.date).format('MM/DD/YYYY').toString());
      // console.log('is same ',moment(appointment.date), moment(formData.date).format('MM/DD/YYYY') ,moment(appointment.date).isSame(moment(formData.date).format('MM/DD/YYYY')));
      if(moment(appointment.date).isSame(moment(formData.date).format('MM/DD/YYYY'))){
        let appStartTime = moment(appointment.startTime,format);
        let appEndTime = moment(appointment.endTime,format);

        if(startTimeData.isBetween(appStartTime,appEndTime)){
          console.log('conflict');
          setFormErrors({ ...formErrors, startTime : {hasError : true}});
        }else{
          console.log('no conflict');
          setFormErrors({ ...formErrors, startTime : {hasError : false}});
        }
      }
    })


  }

  function handleEndTimeChange(){

  }

  function handleButtonClick(){
    onSubmitSucess(formData);
  }

  // check if theres any error
  let isSubmitDisabled = false;
  for(let field in formErrors){
    if(formErrors[field].hasError){
      isSubmitDisabled = true;
    }
  }


  

  return (
    <div>
      <h1>Request Appointment</h1>
      <form>
        <TextField
          id="date"
          label="Select Day"
          type="date"
          defaultValue={moment(formData.date).format('YYYY-MM-DD').toString()}
          helperText={dateHelpText}
          error={formErrors.date.hasError}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="time-start"
          label="Start Time"
          type="time"
          defaultValue={formData.startTime}
          helperText={startTimeHelpText}
          onChange={handleStartTimeChange}
          error={formErrors.startTime.hasError}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <TextField
          id="time-end"
          label="End Time"
          type="time"
          defaultValue={formData.endTime}
          helperText={endTimeHelpText}
          onChange={handleEndTimeChange}
          error={formErrors.endTime.hasError}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
        <Button disabled={isSubmitDisabled} variant="contained" color="primary" onClick={handleButtonClick}>SUBMIT</Button>
      </form>
    </div>
  )
}

function App({}) {

  const [state, dispatch] = useReducer(reducer, initialState);

  // function handleSubmit(e){
  //   console.log('on submit');
  //   e.preventDefault();
  // }

  // function handleButtonClick(e){
  //   console.log('buttonclick');
  //   dispatch({
  //     type:'ADD_APPOINTMENT',
  //     date:'2017-11-24',
  //     startTime:'7:00',
  //     endTime:'8:00' 
  //   });
  // }

  function handleSubmitSucces({date, startTime, endTime}){
    dispatch({
      type:'ADD_APPOINTMENT',
      date,
      startTime,
      endTime
    });
    
  }

  

  return (
    <div className="App">
      <header>
        Appointments
      </header>
      <section>
        <AppointmentForm existingAppointments={state.appointments} onSubmitSucess={handleSubmitSucces} />
      </section>
      <section>
        <h1>Your appointments</h1>
        <ul>
          {state.appointments.map(({date, startTime, endTime}) => (
              <li>
                <span>{date}  </span>
                <span>{startTime}  </span>
                <span>{endTime}  </span>
              </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
