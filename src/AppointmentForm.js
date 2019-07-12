import React, {useState} from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function AppointmentForm({existingAppointments, onSubmitSucess}){

    const [formErrors, setFormErrors] = useState({
      date: {hasError: false},
      startTime: {hasError: false},
      endTime: {hasError: false},
    });
    const [formData, setFormData] = useState({
      date: moment().format('MM/DD/YYYY').toString() ,
      startTime: moment().format('HH:MM').toString(),
      endTime: moment().add(1, 'hours').format('HH:MM').toString()
    });
  
    const dateHelpText = formErrors.date.hasError ? "Please select a future date" : "";
    const startTimeHelpText = formErrors.startTime.hasError ? "Start time has conflict" : "";
    const endTimeHelpText = formErrors.endTime.hasError ? "End time has conflict" : "";
  
    function handleDateChange(e){
      if(moment(e.target.value).isSameOrAfter(moment().format('YYYY-MM-DD'))){
        setFormData({...formData, date: e.target.value});
        setFormErrors({ ...formErrors, date : {hasError : false}});
      } else {
        setFormErrors({...formErrors, date : {hasError : true}});
      }
    }
  
    function handleStartTimeChange(e){
      
      let startTimeData = e.target.value;
      var format = 'hh:mm:ss';
      startTimeData = moment(startTimeData,format);
      
      existingAppointments.map(appointment => {
        if(moment(appointment.date).isSame(moment(formData.date).format('MM/DD/YYYY'))){
          let appStartTime = moment(appointment.startTime,format);
          let appEndTime = moment(appointment.endTime,format);
          if(startTimeData.isBetween(appStartTime,appEndTime)){
            setFormErrors({ ...formErrors, startTime : {hasError : true}});
          }else{
            setFormData({...formData, startTime: moment(startTimeData).format(format)});
            setFormErrors({ ...formErrors, startTime : {hasError : false}});
          }
        }
      });
  
    }
  
    function handleEndTimeChange(e){
  
      var format = 'hh:mm:ss';
      let endTimeData = e.target.value;
      endTimeData = moment(endTimeData,format);
      let startTimeData = moment(formData.startTime, format);
  
      for(let appointment of existingAppointments){
  
        if(moment(appointment.date).isSame(moment(formData.date).format('MM/DD/YYYY'))){
          let appEndTime = moment(appointment.endTime,format);
  
          if(appEndTime.isBetween(startTimeData, endTimeData)){
            setFormErrors({ ...formErrors, endTime : {hasError : true}});
          }else{
            setFormData({...formData, endTime: moment(endTimeData).format(format)});
            setFormErrors({ ...formErrors, endTime : {hasError : false}});
          }
        }
  
      };
  
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
        <h2>Request Appointment</h2>
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

  export default AppointmentForm;