//Freezes state, being unable to be updated through impure methods
import { fromJS } from 'immutable';

//Sets the initial state(s), wrapped in the FromJS method from the Immutable library
const initialState = fromJS({
  user: '',
  query: '',
  supervisorBudgets: [],
  userStatus: null,
  userOnPage: '',
  students: {},
  studentsOnClock: [{ "name": "justin" }],
  studentHoursInToday: [],
  studentHoursOutToday: [],
  studentHoursToday: [],
  studentReviewHours: [],
  timesheetData: '',
  studentStatus: false,
  departmentDNS: [],
  LibData: []
});

//Reducer for handling users logging in and out of the app, initialized above
//sets current state of application 
function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOILER':
      return state
        .set('boiler', action.status);
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
        .set('userOnPage', action.user[0]);
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
    case 'SUPERVISOR-BUDGET-LOADED':
      return state
        .set('supervisorBudgets', action.budgets);
    case 'STUDENTS-LOADED-ON-CLOCK':
      return state
        .set('studentsOnClock', action.students);
    case 'LOAD-CLOCKOUT-HOURS':
      return state
        .set('studentHoursInToday', action.studentIn)
    case 'STUDENT-LOADED-HOURS-TODAY':
      return state
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
    case 'STUDENT-VALIDATION':
      return state
        .set('studentStatus', action.studentStatus);
    case 'DEPARTMENTS-FOUND':
      return state
        .set('departmentDNS', action.userDept);
    case 'LIBRARY-DEPARTMENTS-LOADED':
      action.departments.shift()
      return state
        .set('LibData', action.departments);
    default:
      return state
  }
}


//Export your reducer(s)
export default userReducer;