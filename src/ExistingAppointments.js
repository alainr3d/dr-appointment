import React from 'react';

function ExistingAppointments({existingAppointments}){
    return (
        <div>
        <h1>Your appointments</h1>
        <ul>
            {existingAppointments.map(({date, startTime, endTime}) => (
                <li>
                <span>{date}  </span>
                <span>{startTime}  </span>
                <span>{endTime}  </span>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default ExistingAppointments;
