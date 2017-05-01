import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
var d = new Date();
var n = d.toString();

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
       res == true ? yield put({type: 'USER-FOUND', user: action.user, query: "INSERT INTO student_hours_elapsed (NetID, TimeStamp) VALUES ( " + "'" + action.user + "'," + "'" + n + "')" }) : yield put({type: 'USER-NOT-APPROVED', user: action.user })
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
       res == true ? yield put({type: 'USER-FOUND', user: action.user }) : yield put({type: 'USER-NOT-APPROVED', user: action.user })
 
   }
   catch(error){
      yield put({type: 'USER-404', status: 'Not Found', user: res[0].NetID  })
   }
}

export function* checkUserAsync(action){
  try{
       const response = yield call(fetch, '/db', { method: 'POST', body: action.query } );
       const res = yield response.json();
       res == true ? yield put({type: 'USER-ALLOWED-ON-PAGE', user: action.user }) : window.location = "./logout"
 
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

//Starts all sagas - Entry Point
export default function* rootSaga(){
   yield[
     loginUser(),
     logoutUser(),
     checkUser(),
     transactionUser()
   ]
}