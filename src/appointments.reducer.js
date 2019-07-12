export const initialState = {
    appointments : [{
      date:'07/12/2019',
      startTime:'13:00',
      endTime:'14:00'
    },
    {
      date:'07/13/2019',
      startTime:'12:00',
      endTime:'13:00'
    }]
  };
  
export const reducer = (state, action) => {
    switch(action.type){
        case 'ADD_APPOINTMENT':
        return {
            appointments: [
            ...state.appointments,
            {
                date: action.date,
                startTime: action.startTime,
                endTime: action.endTime
            }
            ]
        };
        case 'REMOVE_APPOINTMENT':
        return state;
        default:
        throw new Error();
    }
}