import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
var d = new Date();
var n = d.toString();
var month = d.getMonth();
var shortDate = d.toLocaleDateString();
var msTime = d.getTime();

//Worker Saga
{/*
  CHANGE QUERY BASED OFF OF LOGIN OR LOGOUT, SEND THE QUERY IN THE POST METHOD AS A OBJECT CONTAINING THE QUERY. IF QUERY SUCCESSFUL, RETURN TRUE, 
  AND ALERT USER OF SUCCESS. IF NOT, RETURN FALSE, AND ALERT USER OF FAILURE. MAY CAN USE OBJECT TO KEEP IT ONLY AT
  ONE DB ROUTE, BY PASSING OFF SOME PARAMETERS
 */}
export function* loginUserAsync(action){
  try{ 
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();   
       let clockQuery = "INSERT INTO student_hours_elapsed (NetID, TimeStamp, ClockIn, ShortDate, msTime) VALUES ( " + "'" + action.user + "'," + "'" + n + "', '1', '" +shortDate+"', '" + msTime + "')";  
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
       let clockQuery = "INSERT INTO student_hours_elapsed (NetID, TimeStamp, ClockOut, ShortDate, msTime) VALUES ( " + "'" + action.user + "'," + "'" + n + "', '1', '" +shortDate+"', '" + msTime + "')"; 
       res.status == true ? yield put({type: 'USER-FOUND', user: action.user, query: clockQuery }) : yield put({type: 'USER-NOT-APPROVED', user: action.user })
       let updateTimeQuery = "SELECT msTimeIn, msTimeOut, DepartmentIn FROM student_hours WHERE NetID ='"+action.user+"'";
       const TimeDataResponse = yield call(fetch, '/db', { method: 'POST', body: updateTimeQuery } )
       const TimeRes = yield TimeDataResponse.json();
       const timeCalc = ( (TimeRes.data[0].msTimeOut - TimeRes.data[0].msTimeIn ) /3600000) * 60;
       const payRate = 7.25;
       const moniesOwed = ((timeCalc/60) * payRate).toFixed(2);
       const departmentLookupQuery = "SELECT Department from department_lookup WHERE MAC='"+TimeRes.data[0].DepartmentIn+"'"; 
       const departmentLookup = yield call(fetch, '/db', { method: 'POST', body: departmentLookupQuery } )
       const departmentLookupRes = yield departmentLookup.json();
       const timeOfYear = month <= 3 ? 'Spring' : (month > 3 && month <= 6) ? 'Summer' : 'Fall'; 
       const updateBudgetQuery = "UPDATE department_budgets SET OverallBudgetUsed = "+moniesOwed+",OverallBudgetRemaining = OverallBudgetRemaining - "+moniesOwed+","+ timeOfYear + "BudgetUsed = "+moniesOwed+"," +timeOfYear + "BudgetRemaining = "+ timeOfYear + "BudgetRemaining - "+moniesOwed+" WHERE Department ='"+departmentLookupRes.data[0].Department + "'";
       console.log(updateBudgetQuery);
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
       console.log("LOOK",res.data[0].Department);
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
    console.log(action.dept);
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       console.log(res.data);
       res.status == true ? yield put({type: 'STUDENTS-LOADED', students: res.data }) : window.location = "./logout"
       yield put({type: 'CURRENT-STUDENTS-ON-CLOCK',  query: "SELECT FirstName, LastName FROM student_hours WHERE UserLoggedIn=TRUE  AND  ( Department1=" + "'"+action.dept+"' OR  Department2=" + "'"+action.dept+"' OR Department3=" + "'"+action.dept+"')" })
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
    console.log(action);

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
    console.log(action);
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       console.log(res);
       let clockOutQuery = "SELECT TimeStamp FROM student_hours_elapsed WHERE ShortDate ='" + shortDate + "' AND NetID='" + action.user  + "'" + "AND ClockOut = TRUE";
       yield put({type: 'LOAD-CLOCKOUT-HOURS', studentIn: res.data, query: clockOutQuery  }) ;
      
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}
export function* retriveCurrentHoursOutTodayAsync(action){
  try{
    console.log(action);
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
    console.log(action);
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res.data.length == 0 ? res.data = [{"TimeStamp": "Student Did Not Work This Day"}] : null;
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
      res.data != false && res.data != '' ? yield put({type: 'STUDENT-REVIEW-TIME-READY', studentReviewHours: finalizedTime  }) : yield put({type: 'STUDENT-REVIEW-TIME-READY', studentReviewHours: null  }) 
}
   catch(error){
      console.log(error);
   }
}
export function* printStudentPayrollAsync(action){
  try{
      const response = yield call(fetch, '/ex', { method: 'POST', body: JSON.stringify(action.time),headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8'}) });
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
      console.log(res.status);
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


//Watcher saga
export function* loginUser(){
  console.log('login Saga is running user');
  yield takeEvery('USER-REQUEST-LOGIN',loginUserAsync);
}

export function* logoutUser(){
  console.log('logout Saga is running user');
  yield takeEvery('USER-REQUEST-LOGOUT',logoutUserAsync);
}

export function* checkUser(){
  console.log('check Saga is running user');
  yield takeEvery('CHECK-USER',checkUserAsync);
}

export function* transactionUser(){
  console.log('transaction Saga is running user');
  yield takeEvery('USER-FOUND',transactionAsync);
}

export function* dashboardPopulate(){
  console.log('dashboard Saga is running user');
  yield takeEvery('POPULATE-DASHBOARD',dashboardAsync);
}

export function* adminSupervisorStudentsPopulate(){
  console.log('Admin Supervisor Students Populate Saga is running user');
  yield takeEvery('RETRIVE-STUDENTS',AdminSupervisorStudentsAsync);
}
export function* getSupervisorBudget(){
  console.log('LOAD-SUPERVISOR-BUDGET Saga is running user');
  yield takeEvery('LOAD-SUPERVISOR-BUDGET',getSupervisorBudgetAsync);
}
export function* retriveCurrentLoggedInStudents(){
  console.log('CURRENT-STUDENTS-ON-CLOCK Saga is running user');
  yield takeEvery('CURRENT-STUDENTS-ON-CLOCK',CurrentStudentsOnClockAsync);
}
export function* retriveCurrentHoursInToday(){
  console.log('RETRIVE-HOURS-IN-TODAY Saga is running user');
  yield takeEvery('RETRIVE-HOURS-TODAY',retriveCurrentHoursInTodayAsync);
}
export function* retriveCurrentHoursOutToday(){
  console.log('RETRIVE-OUT-HOURS-TODAY Saga is running user');
  yield takeEvery('LOAD-CLOCKOUT-HOURS',retriveCurrentHoursOutTodayAsync);
}
export function* retriveSpecificHours(){
  console.log('RETRIVE-SPECIFIC-HOURS Saga is running user');
  yield takeEvery('RETRIVE-SPECIFIC-HOURS',retriveSpecificHoursAsync);
}
export function* retriveStudentHoursToReview(){
  console.log('RETRIVE-STUDENT-TIME-TO-REVIEW Saga is running user');
  yield takeEvery('RETRIVE-STUDENT-TIME-TO-REVIEW',retriveStudentHoursToReviewAsync);
}
export function* printStudentPayroll(){
  console.log('PRINT-TIME Saga is running user');
  yield takeEvery('PRINT-TIME',printStudentPayrollAsync);
}
export function* checkStudentStatus(){
  console.log('CHECK-STUDENT-STATUS Saga is running user');
  yield takeEvery('CHECK-STUDENT-STATUS',checkStudentStatusAsync);
}
export function* submitStudent(){
  console.log('SUBMIT-STUDENT Saga is running user');
  yield takeEvery('SUBMIT-STUDENT',submitStudentAsync);
}
export function* deleteStudent(){
  console.log('SUBMIT-STUDENT Saga is running user');
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