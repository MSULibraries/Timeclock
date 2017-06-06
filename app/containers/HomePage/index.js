/*
 This File is used to display the login screen, with the login, logout, and dashboard buttons. Is the main screen of the app
*/
import React from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/************
Import Style components
************/
import Wrapper from '../../components/wrapper';
import LoginButton, { LogOutButton } from '../../components/loginButton';
import * as Grid from 'react-grid-system';
import LoginBox from '../../components/LoginBox';

//Import Actions for dispatch
import { LogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getRes, getStatusOnUser } from '../App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

//Represents the Dean's Special Fund Mac-Addr
var DSF = "DSF";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { user: '', dept: '' };
        this.success = this.success.bind(this);
        this.updateDept = this.updateDept.bind(this);
    }

    //Verifies the JWT (token) before the component (login screen) is loaded. 
    //If the token is valid, the user is allowed into the timeclock
    //If the token is invalid, the user is logged out of CAS and returned to the main screen
    componentWillMount() {
        var url = window.location.search;
        url = url.replace("?", '');
        if (url != '') {
            this.setState({ token: url })
            fetch('/verify', {
                method: 'POST',
                body: url
            })
                .then((result) => {
                    return result.json();
                })
                .then((response) => {
                    this.props.onChangeUser('CHECK-USER', response.user);
                    this.setState({ user: response.user });
                })
                .catch(function(error) {
                    window.location = "./logout";
                    // console.log(error);
                });
        }
        else {
            this.setState({ user: null });
            //window.location = './logout';
        }
    }

    //Updates the department based off the user's selection from the dropdown box.
    //If the Dean Special Fund flag is true, and set to the same as the department
    //That student is then logged in under Dean Special Fund AND the department
    updateDept(event) {
        this.props.onChangeUser('SET-MAC', this.state.user, event.target.value);
        this.props.userStatus.DSF == event.target.value ? this.setState({ dept: DSF }) : this.setState({ dept: event.target.value });
    }

    //On successful clock-in or out, the student is logged out of CAS after 2 seconds (2000 Miliseconds)
    success() {
        //setTimeout(() => window.location = './logout', 2000)
    }

    render() {
        return (
            <Wrapper>
                <Grid.Container id="container">
                    <Grid.Row>
                        <Grid.Col md={12} offset={{ md: 7 }}>
                            <LoginBox>
                                <h1>MSU Library <br /> Time Clock </h1>
                                {this.props.userStatus.Role != "student" && this.state.user != null ?
                                    <LoginButton onClick={() => window.location = "/dashboard?" + this.state.token} > Dashboard </LoginButton>
                                    : ''}

                                {(this.props.userStatus.Role == "student" && this.props.userStatus.UserLoggedIn != 1) ?
                                    <div>
                                        <select onChange={this.updateDept}>
                                            <option value="22" >Select Your Department</option>
                                            <option value={this.props.userStatus.Department1} >{this.props.userStatus.Department1}</option>
                                            {this.props.userStatus.Department2 != '' ? <option value={this.props.userStatus.Department2} >{this.props.userStatus.Department2}</option> : ''}
                                            {this.props.userStatus.Department3 != '' ? <option value={this.props.userStatus.Department3} >{this.props.userStatus.Department3}</option> : ''}
                                            {this.props.userStatus.Department4 != '' ? <option value={this.props.userStatus.Department4} >{this.props.userStatus.Department4}</option> : ''}
                                        </select> <br /><br />
                                    </div>
                                    : ''}

                                {(this.props.userStatus.UserLoggedIn == 0 && this.props.userStatus.Role == "student") ?
                                    <LoginButton disabled={!this.state.dept} onClick={() => this.props.onChangeUser('USER-REQUEST-LOGIN', this.state.user, this.state.dept)} > Clock In </LoginButton>
                                    : ''}

                                {(this.props.userStatus.UserLoggedIn == 1 && this.props.userStatus.Role == "student") ?
                                    <LoginButton onClick={() => this.props.onChangeUser('USER-REQUEST-LOGOUT', this.state.user, this.state.dept)} > Clock Out </LoginButton>
                                    : ''} <br />

                                {this.state.user != null ?
                                    < LogOutButton onClick={() => window.location = "/logout"} >Logout</LogOutButton>
                                    : < LoginButton onClick={() => window.location = "/cas"} > Login </LoginButton>
                                }
                                {this.props.response ? this.success() : ''}
                                {this.props.response ? <h2>Clocked in. Redirecting… </h2> : ''}
                            </LoginBox>
                        </Grid.Col>
                    </Grid.Row>
                </Grid.Container>
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
        onChangeUser: (evt, name, mac) => dispatch(LogAction(evt, name, mac))
    };
}

//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(Home);