//Freezes state, being unable to be updated through impure methods
import { fromJS } from 'immutable';

//Sets the initial state(s), wrapped in the FromJS method from the Immutable library
const initialState = fromJS({
  user: 'js1599'
});

//Reducer for handling users logging in and out of the app, initialized above
//sets current state of application 
function userReducer(state = initialState, action ){
  switch(action.type){
    case 'LOGGED-IN':
      return state
      .set('user', action.user);
     case 'LOGGED-OUT':
       return state
      .set('user', 'OUT');
     default:
      return state
  }
}


//Export your reducer(s)
export default userReducer;