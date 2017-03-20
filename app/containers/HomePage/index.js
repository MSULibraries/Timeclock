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
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import * as firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBI2JTzPCoW4XsxLmA-TmZA0YRjLDW_96s",
    authDomain: "costume-6b34a.firebaseapp.com",
    databaseURL: "https://costume-6b34a.firebaseio.com",
    storageBucket: "costume-6b34a.appspot.com",
    messagingSenderId: "127827338671"
});

export default class Home extends React.PureComponent {
    constructor(props) {
    super(props);
    this.register = this.register.bind(this);
    this.credits = this.credits.bind(this);
    this.checkUser = this.checkUser.bind(this);
    this.login = this.login.bind(this);
    this.state = {userName: '', password: '', org: '', valid: false, mac: ''};
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
   checkUser() { 
    const email = this.state.userName;
    const password = "1";
    const ref = this.refs.email.style;
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;  
    console.log(errorMessage); 
    if (errorCode === 'auth/user-not-found') {
     ref.color = 'red';
     this.setState({valid: true});
    }
    });
  }
  
  /* Creates new user with login (email) and custom password.
  // Error given if fails, via callback promises
  */
  
  register() {
    console.log('user verified');  
    console.log(this.state.userName); 
    console.log(this.state.password); 
    const email = this.state.userName;
    const password = this.state.password;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      console.log('user created');
    })
    .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;  
    console.log(errorMessage); 
    });
  }
  
   login() {
   const email = this.state.userName;
   const password = this.state.password;
   firebase.auth().signInWithEmailAndPassword(email, password)
   .then( () => {
      //browserHistory.push('/Login');
      //console.log(this.state.data);
      //console.log('logged in')
    console.log(this.refs.options.value);
    let validMac = (this.state.mac == this.refs.options.value) ? true : false
    if(!validMac) {
      throw 'bab';
    }
    else {
      console.log('good');
    }
     })
   .catch ( () =>{
     console.log('wrong MAC');
   })
   }

  
  /* Sets the State for the username and password for auth.
  // Gets ran once the user begins typing
  // Switch statement: case 1 - username, case 2 - password, default - user not typing, so break
  */ 
  credits(event, val){
    switch (val) {
     case 1:
      this.setState({ userName: event.target.value });
      break;
   
     case 2:
      this.setState({ password: event.target.value });
      break;
     
     case 3:
      this.setState({ org: event.target.value });
      break;
   
     default:
      break; 
     }
   }
   
  
  render() {
    return (
      <div>
         <h1>Your computer's MAC address is: {this.state.mac}</h1> 
         <select ref = 'options'>
          <option value= {this.state.mac}>Systems</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
         </select><br />
         <label ref = "email" >User Name: <input value = {this.state.userName} onFocus = {() => {this.setState({valid: false}); this.refs.email.style.color = 'black'; }} onChange = { (event) => this.credits(event, 1)} type = "text" /></label><br />
         <label>Password <input value = {this.state.password} onFocus = {this.checkUser} onChange = { (event) => this.credits(event, 2)} type = "password" /></label><br />
         {this.state.valid ? <label> Org <input value = {this.state.org} onChange = { (event) => this.credits(event, 3)}  type = "text" /></label>: <div></div>}<br/>
         {!this.state.valid ? <button onClick = {this.login} className = "btn btn-danger">Login</button> : <div></div>}
         {this.state.valid ? <button onClick = {this.register} className = "btn btn-warning">Register</button> : <div></div>}
      </div>
    );
  }
}
