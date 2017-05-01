
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
      this.state = {tokenUser: ' '};
  }

	componentWillMount() {
      // console.log(this.props.user); 
       var url = window.location.search;
       url = url.replace("?", ''); // remove the ?
      fetch('/db',{
        method: "POST",
        body: url
      })
      .then((result) => {
         return result.json();
       })
      .then((response) => {
       this.setState({ tokenUser: response[0].NetID });
       this.props.onChangeUser('LOGGED-IN', response[0].NetID);
      })
      .catch((error) =>{
        this.setState({tokenUser: false});
        browserHistory.push('/');
        console.log(error);
      });
    }  
    
  
  render() {
    if((this.state.tokenUser != false) && (this.state.tokenUser != ' ')) {
    return (
      <div>
        <h1> {this.props.mac} </h1>
        <h1>Hello {this.state.tokenUser}, today is { date.getMonth() }/{ date.getDate() }/{ date.getFullYear() }</h1>
         <Graph /> 
        {/* <StudentHours /> */}
        <Supervisor />
        <Link to = "/Logout">Click to logout</Link> 
      </div>
    );  
    }
     else if (this.state.tokenUser == ' '){
      return(
        <div><h1>Waiting.........</h1></div>
      )
    }
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  user: getUser(),
    mac: getMac()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onChangeUser: (evt,name) => dispatch(LogAction(evt,name))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(HomePageSecond);