import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
//Javascript date object
var d = new Date();
var n = d.toString();
var month = d.getMonth();
var shortDate = d.toLocaleDateString();

//Gets the milisecond time 
var msTime = d.getTime();

/*
 *
 * WORKER SAGAS 
 * 
 **/ 

export function* loginUserAsync(action){
  try{ 
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();   
       let clockQuery = "INSERT INTO student_hours_elapsed (NetID, TimeStamp, ClockIn, ShortDate, msTime, Dept) VALUES ( " + "'" + action.user + "'," + "'" + n + "', '1', '" +shortDate+"', '" + msTime + "','" +action.dept+"')";  
       res.status == true ? yield put({type: 'USER-FOUND', user: action.user, query: clockQuery }) : yield put({type: 'USER-NOT-APPROVED', user: action.user })
   }
   catch(error){
     console.log(error);
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}

export function* logoutUserAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       let clockQuery = "INSERT INTO student_hours_elapsed (NetID, TimeStamp, ClockOut, ShortDate, msTime, Dept) VALUES ( " + "'" + action.user + "'," + "'" + n + "', '1', '" +shortDate+"', '" + msTime + "','" +action.dept+"')"; 
       res.status == true ? yield put({type: 'USER-FOUND', user: action.user, query: clockQuery }) : yield put({type: 'USER-NOT-APPROVED', user: action.user })
       let updateTimeQuery = "SELECT msTimeIn, msTimeOut, DepartmentIn FROM Users WHERE NetID ='"+action.user+"'";
       const TimeDataResponse = yield call(fetch, '/db', { method: 'POST', body: updateTimeQuery } )
       const TimeRes = yield TimeDataResponse.json();
       const timeCalc = ( (TimeRes.data[0].msTimeOut - TimeRes.data[0].msTimeIn ) /3600000) * 60;
       const payRate = 7.25;
       const moniesOwed = ((timeCalc/60) * payRate).toFixed(2);
       const departmentLookupQuery = "SELECT Department from department_lookup WHERE MAC='"+TimeRes.data[0].DepartmentIn+"'"; 
       const departmentLookup = yield call(fetch, '/db', { method: 'POST', body: departmentLookupQuery } )
       const departmentLookupRes = yield departmentLookup.json();
       const timeOfYear = month <= 3 ? 'Spring' : (month > 3 && month <= 6) ? 'Summer' : 'Fall'; 
       const updateBudgetQuery = "UPDATE department_budgets SET OverallBudgetUsed = OverallBudgetUsed + "+moniesOwed+",OverallBudgetRemaining = OverallBudgetRemaining - "+moniesOwed+","+ timeOfYear + "BudgetUsed = "+moniesOwed+"," +timeOfYear + "BudgetRemaining = "+ timeOfYear + "BudgetRemaining - "+moniesOwed+" WHERE Department ='"+departmentLookupRes.data[0].Department + "'";
       const budgetQuery = yield call(fetch, '/db', { method: 'POST', body: updateBudgetQuery } )
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}

export function* checkUserAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res.status == true ? yield put({type: 'USER-ALLOWED-ON-PAGE', user: res.data }) : null
 
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* transactionAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}

export function* dashboardAsync(action){
  try{
       let response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       let res = yield response.json();
       res.status == true ? yield put({type: 'DASHBOARD-DATA', user: res.data[0] }) : window.location = "./logout";
       response = yield call(fetch, '/db', { method: 'POST', body: "SELECT Department from department_admins WHERE Admin='"+res.data[0].NetID+"'" } );
       res = yield response.json();
       res.status == true ? yield put({type: 'DEPARTMENTS-FOUND', userDept: res.data }) : ''
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}


export function* AdminSupervisorStudentsAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res.status == true ? yield put({type: 'STUDENTS-LOADED', students: res.data }) : window.location = "./logout"
       yield put({type: 'CURRENT-STUDENTS-ON-CLOCK',  query: "SELECT FirstName, LastName FROM Users WHERE UserLoggedIn=TRUE  AND  ( Department1=" + "'"+action.dept+"' OR  Department2=" + "'"+action.dept+"' OR Department3=" + "'"+action.dept+"')" })
   }
   catch(error){
     console.log(error);
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* getSupervisorBudgetAsync(action){
  try{
      const response = yield call(fetch, '/DB', { method: 'POST', body: action.query });
      const res = yield response.json();
      yield put({type: 'SUPERVISOR-BUDGET-LOADED', budgets: res.data  });      
}
   catch(error){
      console.log(error);
   }
}
export function* CurrentStudentsOnClockAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res.status == true ? yield put({type: 'STUDENTS-LOADED-ON-CLOCK', students: res.data }) : ''
      
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* retriveCurrentHoursInTodayAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       let clockOutQuery = "SELECT TimeStamp FROM student_hours_elapsed WHERE ShortDate ='" + shortDate + "' AND NetID='" + action.user  + "'" + "AND ClockOut = TRUE AND (Dept= '00-00-00-00-00-00' OR Dept='"+action.dept+"')";
       yield put({type: 'LOAD-CLOCKOUT-HOURS', studentIn: res.data, query: clockOutQuery  }) ;
      
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* retriveCurrentHoursOutTodayAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       console.log(res);
        yield put({type: 'STUDENT-LOADED-HOURS-TODAY', studentOut: res.data  }) 
      
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* retriveSpecificHoursAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res.status == false ? res.data = [{"TimeStamp": "Student Did Not Work This Day"}] : null;
       res.status == true ? yield put({type: 'STUDENT-LOADED-SPECIFIC-HOURS', studentHoursToday: res.data  }) : yield put({type: 'STUDENT-LOADED-SPECIFIC-HOURS', studentHoursToday: res.data  }) 
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* retriveStudentHoursToReviewAsync(action){
  try{
        const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
        const res = yield response.json();
        var TimeArray = [];
        var finalizedTime = [];
        var finalPay;
        const payRate = 7.25;
        var TimeWorked;
        var name;
        var Time;
        var j = 0;
        var k = 0;
        if(res.data != null){
        res.data.map( (current, index) =>
          TimeArray[index] = {"name": current.NetID, "Date":current.ShortDate, "milliTime": current.msTime}
        );
          for(var i = 0; i < TimeArray.length; i+=2){
                j = i + 1
                name = TimeArray[i].name;
                TimeWorked = TimeArray[j] != null ? ( (TimeArray[j].milliTime - TimeArray[i].milliTime) /3600000) * 60 : '';
                Time = Number(TimeWorked > 60 ? (TimeWorked/60) : TimeWorked);
                finalPay = (Time/60) * payRate ;
                finalPay = "$" + finalPay.toFixed(2); 
                Time = Time > 60 ? Time.toFixed(2) + " Hours" : Time.toFixed(2) + " Minutes";
                finalizedTime[k] = {"NetID": name, "HoursWorked": Time, "Date": TimeArray[i].Date, "AmountOwed": finalPay};
                k++;
          }
        }
      res.data != false && res.data != null ? yield put({type: 'STUDENT-REVIEW-TIME-READY', studentReviewHours: finalizedTime  }) : yield put({type: 'STUDENT-REVIEW-TIME-READY', studentReviewHours: null  }) 
}
   catch(error){
      console.log(error);
   }
}
export function* printStudentPayrollAsync(action){
  try{
      const response = yield call(fetch, '/printTime', { method: 'POST', body: JSON.stringify(action.time),headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8'}) });
      yield put({type: 'TIMESHEET-READY', timesheetData: action.time[0].NetID  });      
}
   catch(error){
      console.log(error);
   }
}
export function* checkStudentStatusAsync(action){
  try{
      const response = yield call(fetch, '/db', { method: 'POST', body: action.query });
      const res =yield  response.json();
      res.status == true ? yield put({type: 'STUDENT-VALIDATION', studentStatus: true  }) : yield put({type: 'STUDENT-VALIDATION', studentStatus: false  })      
}
   catch(error){
      console.log(error);
   }
}
export function* submitStudentAsync(action){
  try{
      const response = yield call(fetch, '/db', { method: 'POST', body: action.query });
      const res =yield  response.json();
      res.status == true ? yield put({type: 'STUDENT-DATABASE-ENTRY', studentStatus: true  }) : yield put({type: 'STUDENT-DATABASE-ENTRY', studentStatus: false  })      
}
   catch(error){
      console.log(error);
   }
}
export function* deleteStudentAsync(action){
  try{
      const response = yield call(fetch, '/db', { method: 'POST', body: action.query });
      const res =yield  response.json();
      res.status == true ? yield put({type: 'STUDENT-DEACTIVATION', studentStatus: true  }) : yield put({type: 'STUDENT-DEACTIVATION', studentStatus: false  })      
}
   catch(error){
      console.log(error);
   }
}


/*
 *
 * WATCHER SAGAS 
 * 
 * */

//Is executed when a user is requesting to be clocked into the timeclock
export function* loginUser(){
  yield takeEvery('USER-REQUEST-LOGIN',loginUserAsync);
}

//Is executed when a user is requesting to be clocked out of the timeclock
export function* logoutUser(){
  yield takeEvery('USER-REQUEST-LOGOUT',logoutUserAsync);
}

//Is executed when a user is attempting to access the timeclock, making sure
//they are allowed to be on the timeclock app
export function* checkUser(){
  yield takeEvery('CHECK-USER',checkUserAsync);
}

//Is executed if a user is found within the database, meaning they are allowed to 
//be on the timeclock app
export function* transactionUser(){
  yield takeEvery('USER-FOUND',transactionAsync);
}

//Executed to populate the dashboard of a supervisor
export function* dashboardPopulate(){
  yield takeEvery('POPULATE-DASHBOARD',dashboardAsync);
}

//Executed to retrive the active students associated with the students of the 
//logged in supervisor
export function* adminSupervisorStudentsPopulate(){
  yield takeEvery('RETRIVE-STUDENTS',AdminSupervisorStudentsAsync);
}

//Executed to retrive the budget(s) of the logged in supervisor
//Can be multiple budgets if the supervisor is admin of multiple departments
export function* getSupervisorBudget(){
  yield takeEvery('LOAD-SUPERVISOR-BUDGET',getSupervisorBudgetAsync);
}

//Loads the current students clocked into the system of the logged in supervisor
export function* retriveCurrentLoggedInStudents(){
  yield takeEvery('CURRENT-STUDENTS-ON-CLOCK',CurrentStudentsOnClockAsync);
}

//Loads the hours of the student worked on the current date of the system
export function* retriveCurrentHoursInToday(){
  yield takeEvery('RETRIVE-HOURS-TODAY',retriveCurrentHoursInTodayAsync);
}

//Loads the hours which the student has clocked out of the current system date
export function* retriveCurrentHoursOutToday(){
  yield takeEvery('LOAD-CLOCKOUT-HOURS',retriveCurrentHoursOutTodayAsync);
}

//Retrives the specific hours of a student within the timeclock requested by a supervisor 
export function* retriveSpecificHours(){
  yield takeEvery('RETRIVE-SPECIFIC-HOURS',retriveSpecificHoursAsync);
}

//Retrives the hours which a student has worked in the designated time period for review
//by a supervisor
export function* retriveStudentHoursToReview(){
  yield takeEvery('RETRIVE-STUDENT-TIME-TO-REVIEW',retriveStudentHoursToReviewAsync);
}

//Print the timesheet of the requested time period 
export function* printStudentPayroll(){
  yield takeEvery('PRINT-TIME',printStudentPayrollAsync);
}

//Checks the status of a student in the timeclock to see if they're active or not
export function* checkStudentStatus(){
  yield takeEvery('CHECK-STUDENT-STATUS',checkStudentStatusAsync);
}

//Submits a student for entry or update  in the database
export function* submitStudent(){
  yield takeEvery('SUBMIT-STUDENT',submitStudentAsync);
}

//Deactivates a student in the timeclock, preventing them
//from clocking back into the timeclock 
export function* deleteStudent(){
  yield takeEvery('DELETE-STUDENT',deleteStudentAsync);
}
//Starts all sagas - Entry Point
export default function* rootSaga(){
   yield[
     loginUser(),
     logoutUser(),
     checkUser(),
     transactionUser(),
     dashboardPopulate(),
     adminSupervisorStudentsPopulate(),
     retriveCurrentLoggedInStudents(),
     retriveCurrentHoursInToday(),
     retriveCurrentHoursOutToday(),
     retriveSpecificHours(),
     retriveStudentHoursToReview(),
     printStudentPayroll(),
     getSupervisorBudget(),
     checkStudentStatus(), 
     submitStudent(),
     deleteStudent()
   ]
}