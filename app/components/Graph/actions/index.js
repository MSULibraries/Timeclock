//Redux Action defines what will be the update to the state tree, based off the action creator.

export function BudgetAction (action,userName,dept,budget){ 
if (action == 'LOAD-SUPERVISOR-BUDGET'){
    return{
		type: "LOAD-SUPERVISOR-BUDGET",
    user: userName,
		dept: dept,
    query: "SELECT " + budget + "BudgetStarting, "+budget+"BudgetUsed  FROM department_budgets WHERE Department='"+dept+"'"
	}
}
};