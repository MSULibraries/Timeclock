import { createSelector } from 'reselect';
// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

//Selects current state of user
const getBoiler = () => createSelector(
   userSelector,
   (state) => state.get('boilerStatus')
);
const userSelector = state => state.get('user');

//Creates the selector and updates based off the current state from userSelector
const getUser = () => createSelector(
   userSelector,
   (state) => state.get('user')
);

const getRes = () => createSelector(
   userSelector,
   (state) => state.get('userStatus')
);

const getStatusOnUser = () => createSelector(
   userSelector,
   (state) => state.get('userOnPage')
);
const getStudents = () => createSelector(
   userSelector,
   (state) => state.get('students')
);
const getMAC = () => createSelector(
   userSelector,
   (state) => state.get('mac')
);
const getSupervisorBudgets = () => createSelector(
   userSelector,
   (state) => state.get('supervisorBudgets')
);
const getStudentsOnClock = () => createSelector(
   userSelector,
   (state) => state.get('studentsOnClock')
);
const getStudentHoursInToday = () => createSelector(
   userSelector,
   (state) => state.get('studentHoursInToday')
);
const getStudentHoursOutToday = () => createSelector(
   userSelector,
   (state) => state.get('studentHoursOutToday')
);
const getSpecificHours = () => createSelector(
   userSelector,
   (state) => state.get('studentHoursToday')
);
const getStudentReviewHours = () => createSelector(
   userSelector,
   (state) => state.get('studentReviewHours')
);
const getStudentTimesheet = () => createSelector(
   userSelector,
   (state) => state.get('sheetDownload')
);
const getStudentStatus = () => createSelector(
   userSelector,
   (state) => state.get('studentStatus')
);
const getDepartmentDNS = () => createSelector(
   userSelector,
   (state) => state.get('departmentDNS')
);
const getDepartments = () => createSelector(
   userSelector,
   (state) => state.get('LibData')
);

export {
  getBoiler,
  makeSelectLocationState,
  getUser,
  getRes,
  getStatusOnUser,
  getStudents,
  getMAC,
  getSupervisorBudgets,
  getStudentsOnClock,
  getStudentHoursInToday,
  getStudentHoursOutToday,
  getSpecificHours,
  getStudentReviewHours,
  getStudentTimesheet,
  getStudentStatus,
  getDepartmentDNS
};
