
import React from 'react';
import { Link, browserHistory } from 'react-router';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Wrapper from '../../components/wrapper';
import LoginButton from '../../components/loginButton';

//Import Actions for dispatch
import { LogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser } from '../App/selectors.js';
import { getRes } from '../App/selectors.js';
import { getStatusOnUser } from '../App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';
var DSF = "00-00-00-00-00-00";


 class Home extends React.PureComponent {
    constructor(props) {
    super(props);
    this.state = {mac: '', user:'', dept: ''};
    this.success = this.success.bind(this);
  }
  
   componentWillMount(){
    var url = window.location.search;
    url = url.replace("?", '');
    if(url != ''){
      this.setState({ token: url }) 
       fetch('/verify',{
          method: 'POST',
          body: url
        })
        .then((result) => {
          return result.json();
        })
        .then((response) => {
          this.props.onChangeUser( 'CHECK-USER', response.user );
          this.setState({ user: response.user })  ;
        })
        .catch(function(error){
          window.location = "./logout";
         // console.log(error);
        });
         
      fetch('/ap')
        .then((result) => {
          return result.json();
        })
        .then((response) => {
           this.props.onChangeUser( 'SET-MAC', this.state.user, response )
           this.props.userStatus.DSF ==  response ? this.setState({ mac: DSF }) : this.setState({ mac: response }) ;
        })
        .catch(function(error){
          console.log(error);
        });
    }
    else{
      this.setState({user: null});
      //window.location = './logout';
    }   
       
  } 
  success(){
    //setTimeout( () => window.location = './logout', 2000 )
    
  }
  
  render() {
    return (   
      <Wrapper style={{ marginTop: '20em' }}>
      <h1>MSU Library <br /> Time Clock </h1>  
        {this.props.userStatus.Role != "student"  && this.state.user!= null ? <LoginButton onClick = { () => window.location = "/dashboard?"+this.state.token } > 
          Dashboard
        </LoginButton> : '' }
        {(this.props.userStatus.Role == "student") ?<div> <select onChange = { (event) => this.setState({dept: event.target.value })}>
           <option value = "22" >Select Your Department</option>
           <option value = "4C-72-B9-55-CD-C3" >{this.props.userStatus.Department1}</option>
          {this.props.userStatus.Department2 != '' ?  <option value = "4C-72-B9-55-CD-C3" >{this.props.userStatus.Department2}</option> : '' }
          {this.props.userStatus.Department3 != '' ?  <option value = "4C-72-B9-55-CD-C3" >{this.props.userStatus.Department3}</option> : ''}
          {this.props.userStatus.Department4 != '' ? <option value = "4C-72-B9-55-CD-C3" >{this.props.userStatus.Department4}</option> : ''}
          </select> <br /><br /></div>: '' }
        
        {(this.props.userStatus.UserLoggedIn == 0 && this.props.userStatus.Role == "student") ? <LoginButton disabled={ !this.state.dept } onClick = { () => this.props.onChangeUser( 'USER-REQUEST-LOGIN', this.state.user, this.state.dept ) } > 
          Clock In
        </LoginButton> : '' }
        
        {(this.props.userStatus.UserLoggedIn == 1 && this.props.userStatus.Role == "student") ? <LoginButton onClick = { () => this.props.onChangeUser( 'USER-REQUEST-LOGOUT', this.state.user, this.state.dept ) } > 
          Clock Out
        </LoginButton> : '' }
        <br />
        {this.state.user!= null ?< LoginButton onClick = {  () => window.location = "/logout" } > 
          Logout
        </LoginButton> : < LoginButton onClick = {  () => window.location = "/cas" } > 
          Login
        </LoginButton> }
        { this.props.response ? this.success() : '' }
        { this.props.response ? <h2>Clocked in. Redirecting… </h2> : '' }
   </Wrapper>     
    );
  }
}


//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
	  user: getUser(),
    response: getRes(),
    userStatus: getStatusOnUser()
  });
 
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    onChangeUser: (evt,name, mac) => dispatch(LogAction(evt, name, mac))
  };
}

 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Home);