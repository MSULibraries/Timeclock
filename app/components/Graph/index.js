import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import chart from 'chart.js';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { BudgetAction } from './actions' ;
//Import selectors for use in getting minimal state from Redux global store
import { getUser, getSupervisorBudgets, getDepartmentDNS } from '../../containers/App/selectors.js';
//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';
var budget = "Overall";


var ctx = document.getElementById('graph');

class Graph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
     constructor(props) {
      super(props);
      this.plot = this.plot.bind(this);
      this.getBudget = this.getBudget.bind(this);
      this.state = {budgetStarted: 0, budgetUsed: 0, department: this.props.user.Primary};
  }
  plot(data){
      var res = this.props.budget[0];
      console.log();
   var ctx = document.getElementById("graph");
var data = {
    labels: [
        "Budget Used",
        "Budget Remaining"
    ],
    datasets: [
        {
            data: [res[budget+ "BudgetUsed"],res[budget + "BudgetStarting"] ],
            backgroundColor: [
                "#FF6384",
                "#90ee90"
            ],
            hoverBackgroundColor: [
                "#36A2EB",
                "#36A2EB"
            ]
        }]
}; 
var myChart = new Chart(ctx, {
    type: 'pie',
    data: data
});


this.setState({budgetStarted: res[budget + "BudgetStarting"] , budgetUsed: res[budget +"BudgetUsed"] })
 }
  getBudget(event){
      budget = event.target.value;
      this.props.BudgetAction('LOAD-SUPERVISOR-BUDGET', this.props.user.NetID, this.state.department, budget);
  }
  componentDidMount(){
      this.props.BudgetAction('LOAD-SUPERVISOR-BUDGET', this.props.user.NetID, this.state.department, "Overall");
  }
  componentDidUpdate(){
      console.log(this.props.deptDNS);
   this.plot();
  }
 
    
  render() {
    return (
        <div>
        <select onChange = {this.getBudget}>
          <option value = "Overall">Overall</option>
          <option value = "Fall">Fall</option>
          <option value = "Spring">Spring</option>
          <option value = "Summer">Summer</option>
        </select>
        <select onChange = { (event) => this.setState({department: event.target.value})}>
          <option value = "Overall">Select A Department</option>
          {this.props.deptDNS.map( (current, index) =>
                <option key = {index} value = {current.Department}>{current.Department}</option>
              )}
        </select>
        <h3>Budget Started: {this.state.budgetStarted}</h3>
        <h3>Budget Used: {this.state.budgetUsed} </h3>
        <h3>Budget Remaining: {this.state.budgetStarted - this.state.budgetUsed} </h3>
          <div style = {{ width: '20%'}}>
            <canvas id="graph" width="100" height="100"></canvas>
          </div>
      </div>
    );
  }
}

//Redux method to allow the props to have access to the Redux global store
//With the least minimal state representation possible through Reselect library
const mapStateToProps = createStructuredSelector({
    deptDNS: getDepartmentDNS(),
    user: getUser(),
    budget: getSupervisorBudgets()
  });
  
 //Redux method to bind the actions created in the component to a dispatch
 export function mapDispatchToProps(dispatch) {
  return {
    BudgetAction: (evt,name,department,budget) => dispatch(BudgetAction(evt,name,department,budget))
  };
}
 //Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps,mapDispatchToProps)(Graph);
