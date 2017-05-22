//Freezes state, being unable to be updated through impure methods
import { fromJS } from 'immutable';

//Sets the initial state(s), wrapped in the FromJS method from the Immutable library
const initialState = fromJS({
  user: '',
  query: '',
  userStatus: null,
  userOnPage: false,
  students: { },
  studentsOnClock: [ {"name" : "justin"} ],
  studentHoursInToday: [],
  studentHoursToday: [],
  studentReviewHours: [],
  timesheetData: ''
});

//Reducer for handling users logging in and out of the app, initialized above
//sets current state of application 
function userReducer(state = initialState, action ){
  switch(action.type){
    case 'USER-REQUEST-LOGIN':
      return state
      .set('user', action.user);
     case 'USER-FOUND':
      return state
      .set('userStatus', true);
     case 'USER-NOT-APPROVED':
      return state
      .set('userStatus', false);
    case 'USER-ALLOWED-ON-PAGE':
      return state
      .set('userOnPage', true);
     case 'LOGGED-OUT':
       return state
      .set('user', 'OUT');
      case 'DASHBOARD-DATA':
       return state
       .set('user', action.user);
      case 'STUDENTS-LOADED':
       return state
       .set('students', action.students);
      case 'SET-MAC':
       return state
       .set('mac', action.department);
      case 'STUDENTS-LOADED-ON-CLOCK':
       return state
       .set('studentsOnClock', action.students);
      case 'STUDENT-LOADED-HOURS-TODAY':
       return state
       .set('studentHoursInToday', action.studentIn)
       .set('studentHoursOutToday', action.studentOut);
      case 'STUDENT-LOADED-SPECIFIC-HOURS':
       return state
       .set('studentHoursToday', action.studentHoursToday);
      case 'STUDENT-REVIEW-TIME-READY':
       return state
       .set('studentReviewHours', action.studentReviewHours);
      case 'TIMESHEET-READY':
       return state
       .set('sheetDownload', action.timesheetData);
     default:
      return state
  }
}


//Export your reducer(s)
export default userReducer;