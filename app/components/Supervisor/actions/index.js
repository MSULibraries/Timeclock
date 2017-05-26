//Redux Action defines what will be the update to the state tree, based off the action creator.

export function ogAction (action,userName,dept){ 
if (action == 'RETRIVE-STUDENTS'){
    return{
		type: "RETRIVE-STUDENTS",
    user: userName,
    status: 'Admin',
		dept: dept,
    query: "SELECT * FROM students WHERE Status= 'Student' AND Department = '" + dept + "'"
	}
}
};
export function BudgetAction (action,userName,dept){ 
if (action == 'LOAD-SUPERVISOR-BUDGET'){
    return{
		type: "LOAD-SUPERVISOR-BUDGET",
    user: userName,
		dept: dept,
    query: "SELECT * FROM department_budgets WHERE Department='"+dept+"' AND Admin = '" + userName + "'"
	}
}
};