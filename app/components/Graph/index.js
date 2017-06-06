/*
 *
 * This graph is for the DEPARTMENTAL/SEMESTER budgets
 * that's loaded for a SUPERVISOR
 * 
 * */

import React from 'react';
import chart from 'chart.js';
import WrapMe, { BudgetInfo, PieChart } from './styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Import Actions for dispatch
import { BudgetAction } from './actions';
//Import selectors for use in getting minimal state from Redux global store
import { getUser, getSupervisorBudgets, getDepartmentDNS } from '../../containers/App/selectors.js';
//Import method from Reselect library to map properties to selector methods
import { createStructuredSelector } from 'reselect';

//This variable is used to bootstrap the chart with the initial overall budget 
//of the requesting admin's Primarydepartment
var budget = "Overall";

class Graph extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    constructor(props) {
        super(props);
        this.plot = this.plot.bind(this);
        this.getBudget = this.getBudget.bind(this);
        this.deptUpdated = this.deptUpdated.bind(this);
        this.state = { budgetStarted: 0, budgetUsed: 0, department: this.props.user.Department1, budget: budget };
    }
    plot(data) {
        var ctx = this.refs.graph;
        var res = this.props.budget[0];
        var data = {
            labels: [
                "Budget Used",
                "Budget Remaining"
            ],
            datasets: [
                {
                    data: [res[budget + "BudgetUsed"], res[budget + "BudgetStarting"]],
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


        this.setState({ budgetStarted: res[budget + "BudgetStarting"], budgetUsed: res[budget + "BudgetUsed"] })
    }
    getBudget(event) {
        budget = event.target.value;
        this.props.BudgetAction('LOAD-SUPERVISOR-BUDGET', this.props.user.NetID, this.state.department, budget);
        this.setState({ budget: budget });
    }
    deptUpdated(event) {
        var dept = event.target.value;
        this.props.BudgetAction('LOAD-SUPERVISOR-BUDGET', this.props.user.NetID, dept, this.state.budget);
        this.setState({ department: dept });
    }
    componentWillMount() {
        this.props.BudgetAction('LOAD-SUPERVISOR-BUDGET', this.props.user.NetID, this.state.department, "Overall");
    }
    componentDidUpdate() {
        this.plot();
    }


    render() {

        return (
            <WrapMe id="BudgetInfo">
                <BudgetInfo>
                    <h2>Departmental Budget Overview</h2>
                    <h3>Semester: &nbsp;
            <select style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px', marginRight: '10px' }} onChange={this.getBudget}>
                            <option value="Overall">Overall</option>
                            <option value="Fall">Fall</option>
                            <option value="Spring">Spring</option>
                            <option value="Summer">Summer</option>
                        </select>
                    </h3>
                    <h3>Department: &nbsp;
            <select style={{ background: 'white', border: '1px solid #ccc', borderRadius: '3px' }} onChange={this.deptUpdated}>
                            {this.props.deptDNS.map((current, index) =>
                                <option key={index} value={current.Department}>{current.Department}</option>
                            )}
                        </select>
                    </h3>
                    <h3>Total Budget: ${this.state.budgetStarted}</h3>
                    <h3>Budget Used: ${this.state.budgetUsed} </h3>
                    <h3>Budget Remaining: ${this.state.budgetStarted - this.state.budgetUsed} </h3>
                </BudgetInfo>
                <PieChart>
                    <div style={{ width: '100%' }}>
                        <canvas ref="graph" width="100" height="100"></canvas>
                    </div>
                </PieChart>
            </WrapMe>
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
        BudgetAction: (evt, name, department, budget) => dispatch(BudgetAction(evt, name, department, budget))
    };
}
//Exports class to be used, wrapped in the Redux Higher Order Component (HOC) connect()
export default connect(mapStateToProps, mapDispatchToProps)(Graph);
