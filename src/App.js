import React, {useReducer, useState} from 'react';
import {reducer, initialState} from './appointments.reducer';
import ExistingAppointments from './ExistingAppointments';
import AppointmentForm from './AppointmentForm';
import logo from './logo.svg';
import './App.css';



function App({}) {

  const [state, dispatch] = useReducer(reducer, initialState);

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
        <ExistingAppointments existingAppointments={state.appointments} />
      </section>
    </div>
  );
}

export default App;
