
import React from 'react';
import { Link, browserHistory } from 'react-router';
import Graph from '../../components/Graph/index.js';
import StudentHours from '../../components/StudentHours/index.js';
import Supervisor from '../../components/Supervisor/index.js';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { LogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getMac } from '../App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

var date = new Date();

class HomePageSecond extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.state = {flag: false};
  }

	componentWillMount() {

          this.props.onChangeUser( 'POPULATE-DASHBOARD', 'js1599' );
          this.setState({ flag: true }) ;
 
    }  
    
  
  render() {
    return (
      <div>
        <h1 style = {{ marginLeft: '15px' }}>Hello {this.props.user.FirstName}, today is { date.toLocaleDateString() } </h1>
        { (this.props.user.Status == 'Admin' || this.props.user.Status == 'SU') ? <Graph />  : '' }
        { this.props.user.Status == 'Student' ?  <StudentHours /> : ''}
         <Supervisor  />
         
      </div>
    );  
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  user: getUser()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onChangeUser: (evt,name) => dispatch(LogAction(evt,name))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(HomePageSecond);