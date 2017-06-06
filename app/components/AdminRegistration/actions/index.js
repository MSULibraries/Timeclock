//Redux Action defines what will be the update to the state tree, based off the action creator.

export function FormAction(action, state) {
  console.log(state);
  if (action == 'CHECK-ADMIN-STATUS') {
    return {
      type: "CHECK-STUDENT-STATUS",
      NetID: state.NetID,
      query: "SELECT NetID FROM Users WHERE NetID='" + state.NetID + "'"
    }
  }
  else if (action == 'SUBMIT-ADMIN') {
      return {
        type: "SUBMIT-ADMIN",
        NetID: state.NetID,
        departments: [ state.dept1, state.dept2, state.dept3, state.dept4 ],
        query: "INSERT INTO Users (NetID, 9Digit, FirstName, LastName, Department1, Department2, Department3, Role ) VALUES('" + state.NetID + "','" + state.NINEdigit + "','" + state.firstName + "','" + state.lastName + "','" + state.dept1 + "','" + state.dept2 + "','" + state.dept3 + "','admin') " 
      }
    }
  } 
export function LoadDepts(action) {
  if (action == 'ALL-DEPARTMENTS') {
    return {
      type: "ALL-DEPARTMENTS",
      query: "SELECT * FROM department_lookup" 
    }
  }
}

  
   