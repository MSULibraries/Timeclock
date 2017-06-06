//Redux Action defines what will be the update to the state tree, based off the action creator.

export function FormAction(action, state) {
  console.log(state);
  if (action == 'CHECK-STUDENT-STATUS') {
    return {
      type: "CHECK-STUDENT-STATUS",
      NetID: state.NetID,
      query: "SELECT NetID FROM Users WHERE NetID='" + state.NetID + "'"
    }
  }
  else if (action == 'SUBMIT-STUDENT') {
    if (state.status === "true") {
      return {
        type: "SUBMIT-STUDENT",
        NetID: state.NetID,
        query: `INSERT INTO Users (NetID, 9Digit, FirstName, LastName, EmployeeType, Phone, Addr, Sex, Race, Department1, Department2, Department3, Department4, WS, HoursRemain ) VALUES` +
        "('" + state.NetID + "','" + state.NINEdigit + "','" + state.firstName + "','" + state.lastName + "','" + state.employeeType + "','" + state.Phone + "','" + state.Addr + "','" +
        state.sex + "','" + state.race + "','" + state.dept1 + "','" + state.dept2 + "','" + state.dept3 + "','" + state.dept4 + "','" + state.WS + "','" + state.HoursRemain + "') "
      }
    }
    else {
      return {
        type: "SUBMIT-STUDENT",
        NetID: state.NetID,
        query: "UPDATE Users SET FirstName ='" + state.firstName + "', 9Digit ='" + state.NINEdigit + "', LastName ='" + state.lastName + "', EmployeeType ='" + state.employeeType + "', Sex ='" + state.sex + "', Race ='" + state.race + "', Department1 ='" + state.dept1 + "', Department2 ='" + state.dept2 + "', Department3 ='" + state.dept3 + "', Department4 ='" + state.dept4 + "' WHERE NetID ='" + state.NetID + "'"
      }
    }
  }
};