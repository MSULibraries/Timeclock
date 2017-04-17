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
const userSelector = state => state.get('user');

//Creates the selector and updates based off the current state from userSelector
const getUser = () => createSelector(
   userSelector,
   (state) => state.get('user')
);

export {
  makeSelectLocationState,
  getUser
};
