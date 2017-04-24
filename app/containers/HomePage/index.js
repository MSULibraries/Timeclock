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
import { connect } from 'react-redux';
import Body from '../../components/body';
import H1 from '../../components/h1';
import H2 from '../../components/h2';
import Wrapper from '../../components/wrapper';
import LoginButton from '../../components/loginButton';
import ClickMe from '../../components/clickme';
import Department from '../../components/department';

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

        
         <H1>Your computer is for Systems</H1> 
        
<Wrapper>
      <Department>      
        <div>  
          <H2>Department</H2>
          <select ref='options'>
           <option value={this.state.mac}>Select a Department</option>     
          <option value={this.state.mac}>Systems</option>
          <option value={this.state.mac}>Access Services</option>
          <option value= {this.state.mac}>Research Services</option>      
         </select>
        </div><br />
      </Department> 
          
          <H2>Username</H2>
          <select ref = 'options'>
          <option value={this.state.mac}>jed31</option>
          <option value={this.state.mac}>mcc235</option>
          <option value={this.state.mac}>pch1</option> 
          <option value= {this.state.mac}>shc1</option>   
         </select>
         <br />
         <br />
        
        <LoginButton onClick={this.login}>
          Login
        </LoginButton>

        {/* <h1> {this.props.user} </h1>

        <ClickMe>
          <button onClick={() => this.props.onChangeUser('LOGGED-IN', this.state.userName)}>Click Me</button>
        </ClickMe> */} 
</Wrapper>
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