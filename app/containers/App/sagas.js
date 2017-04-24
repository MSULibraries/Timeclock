import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

//Worker Saga
export function* createUserAsync(){
  try{
       console.log('Success')
      // const response = yield call(fetch, '/cas', {method: 'GET', mode: 'cors',headers:{'Access-Control-Allow-Origin':'*'}} );
       const res = yield response.json();
       console.log(res);
       
      // yield put({type: 'LOGGED-OUT'})
  }catch(error){
       console.log(error);
  }
}
//Watcher saga
export function* getUser(){
  console.log('reduux Saga is running user');
  yield takeEvery('LOGGED-IN',createUserAsync);
}

//Starts all sagas - Entry Point
export default function* rootSaga(){
   yield[
     getUser(),
   ]
}