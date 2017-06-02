import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { BoilerAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getBoiler } from '../../containers/App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

class Boiler extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      //this.x = this.x.bind(this);
      //this.state = {x: '' };
  }
    
  render() {
    return (
      <div>
        <h1>HELLO WORLD, YOUR BOILER IS RUNNING !</h1> 
        <button onClick = { () => this.props.onBoiler('BOILER', null, null) }>Test Action Creator</button>
      </div>
    );
  }
}
//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  BoilerState: getBoiler()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onBoiler: (action, var2, var3) => dispatch(BoilerAction(action, var2, var3))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Boiler);

