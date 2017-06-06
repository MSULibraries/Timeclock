/*
 This is the dashboard container for all of the other dashboards. It will render the appropiate dashboard 
 for the user, based off of their credentials
*/
import React from 'react';
import { Link, browserHistory } from 'react-router';

/************
Import Individual Dashboard components
************/
import Graph from '../../components/Graph';
import StudentHours from '../../components/StudentHours';
import Register from '../../components/AdminRegistration';
import Boiler from '../../components/Boiler';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/************
Import style for Registeration
************/
import { RegisterStyle } from '../../components/AdminRegistration/styles';
import * as Grid from 'react-grid-system';

//Import Actions for dispatch
import { LogAction } from './actions';

//Import selectors for use in getting minimal state from Redux global store
import { getUser, getMac } from '../App/selectors.js';

//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

//JavaScript Date object, used to determine the month and day of the week
var date = new Date();

class HomePageSecond extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { flag: false };
  }

  //Populates the dashboard based off the token being decoded to reveal whom the autheticated user is
  componentWillMount() {
    var url = window.location.search;
    url = url.replace("?", '');
    fetch('/verify', {
      method: 'POST',
      body: url
    })
      .then((result) => {
        return result.json();
      })
      .then((response) => {
        this.props.onChangeUser('POPULATE-DASHBOARD', response.user);
        this.props.onChangeUser('ALL-DEPARTMENTS');
        this.setState({ flag: true });
      })
      .catch(function (error) {
        //window.location = "./logout";
        // console.log(error);
      });
  }

  //If the user is autheticated AND the data is ready, load the dashboard
  //If not, then display the Loading screen
  render() {
    return (
      <div>
        <Grid.Container id="container">
          <Grid.Row>
            <Grid.Col md={3} offset={{ md: 6 }}>
              <RegisterStyle style={{ marginTop: '10em' }}>
                <Register />
              </RegisterStyle>
            </Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </div>
    )
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
    onChangeUser: (evt, name) => dispatch(LogAction(evt, name))
  };
}
//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(HomePageSecond);