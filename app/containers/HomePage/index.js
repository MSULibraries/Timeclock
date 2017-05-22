
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


 class Home extends React.PureComponent {
    constructor(props) {
    super(props);
    this.state = {mac: '', user:''};
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
          this.setState({ mac: response }) ;
        })
        .catch(function(error){
          console.log(error);
        });
    }
    else{
      window.location = './logout';
    }   
       
  } 
  success(){
    //setTimeout( () => window.location = './logout', 5000 )
    
  }
  
  render() {
    return (   
    <Wrapper>
        <LoginButton onClick = { () => window.location = "/dashboard?"+this.state.token } > 
          Login To Dashboard
        </LoginButton><br/>
        
        <LoginButton onClick = { () => this.props.onChangeUser( 'USER-REQUEST-LOGIN', this.state.user, this.state.mac ) } > 
          Clock In
        </LoginButton><br />
        
        <LoginButton onClick = { () => this.props.onChangeUser( 'USER-REQUEST-LOGOUT', this.state.user, null ) } > 
          Clock Out
        </LoginButton><br />
        { this.props.response ? this.success() : <h1>SELECT A ACTION</h1> }
        { this.props.response ? <h1>CONGRATS, YOUR REQUEST WAS ACCEPTED ! </h1> : '' }
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