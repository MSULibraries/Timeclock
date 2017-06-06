//Redux Action defines what will be the update to the state tree, based off the action creator.

export function ogAction(action, userName, dept) {
  if (action == 'RETRIVE-STUDENTS') {
    return {
      type: "RETRIVE-STUDENTS",
      user: userName,
      status: 'Admin',
      dept: dept,
      //Selects all students who are active workers from various deptartments
      query: "SELECT * FROM users WHERE Role= 'student' AND Status = 1 AND ( Department1=" + "'" + dept + "' OR  Department2=" + "'" + dept + "' OR Department3=" + "'" + dept + "' OR Department4=" + "'" + dept + "')"
    }
  }
};
export function BudgetAction(action, userName, dept) {
  if (action == 'LOAD-SUPERVISOR-BUDGET') {
    return {
      type: "LOAD-SUPERVISOR-BUDGET",
      user: userName,
      dept: dept,
      query: "SELECT * FROM department_budgets WHERE Department='" + dept + "' AND Admin = '" + userName + "'"
    }
  }
};