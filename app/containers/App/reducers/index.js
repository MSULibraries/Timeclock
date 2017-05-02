//Freezes state, being unable to be updated through impure methods
import { fromJS } from 'immutable';

//Sets the initial state(s), wrapped in the FromJS method from the Immutable library
const initialState = fromJS({
  user: '',
  query: '',
  userStatus: null,
  userOnPage: false
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
     default:
      return state
  }
}


//Export your reducer(s)
export default userReducer;