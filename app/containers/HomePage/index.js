/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Link, browserHistory } from 'react-router';
import { FormattedMessage } from 'react-intl';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import H1 from '../../components/h1';
import Wrapper from '../../components/wrapper';

//Import Actions for dispatch
import { LogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser } from '../App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';


 class Home extends React.PureComponent {
    constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.state = {userName: '', password: '',  mac: ''};
  }
  
   componentWillMount(){
    fetch('/ap')
      .then((result) => {
         return result.json();
       })
      .then((response) => {
        this.setState({ mac: response})  ;
      })
      .catch(function(error){
        console.log(error);
      });
    }
    
  login(){
    fetch('/api',{method: 'POST', body: this.state.userName})
      .then((result) => {
         return result.json();
       })
      .then((response) => {
        var userFound = response.length < 1 ?  false : true;
        if(userFound){
          switch(response[0].Status){
            case 'Admin':
             this.props.onChangeUser('LOGGED-IN',this.state.userName);
             break;
            case 'Student':
             break;
            default:
             break;
          }
        }
        else{
          console.log('No user Found');
        }
         
      
      })
      .catch(function(error){
        console.log(error);
      });
    }
  
  render() {
    return (
      <div>
        <Wrapper>
         <H1>Your computer's MAC address is: {this.state.mac}</H1> 
        </Wrapper>
         <select ref = 'options'>
          <option value= {this.state.mac}>Systems</option>
         </select><br />
         <label>User Name: <input type = "text" onChange = { (event) => this.setState({userName: event.target.value}) }/></label><br />
         <label>Password:  <input  type = "password" onChange = { (event) => this.setState({password: event.target.value}) } /></label><br />
         <button onClick = {this.login} className = "btn btn-danger">Login</button> 
        <h1> {this.props.user} </h1>
        <button onClick = { () => this.props.onChangeUser('LOGGED-IN',this.state.userName) }>Click Me</button>
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
export default connect(mapStateToProps,mapDispatchToProps)(Home);