//Redux Action defines what will be the update to the state tree, based off the action creator.
var d = new Date();
var n = d.toString();
export function LogAction (action,userName, department){ 
if (action == 'USER-REQUEST-LOGIN'){
    return{
		type: "USER-REQUEST-LOGIN",
    user: userName,
		dept: department,
		query: "UPDATE student_hours SET ClockIn ="+"'"+n+"'"+"WHERE NetID ="+ "'"+userName+"'" +  " AND  ( Department1=" + "'"+department+"' OR  Department2=" + "'"+department+"' OR Department3=" + "'"+department+"')"
	}
}
else if (action == 'USER-REQUEST-LOGOUT'){
    return{
		type: "USER-REQUEST-LOGOUT",
		user: userName,
		query:  "UPDATE student_hours SET ClockOut ="+"'"+n+"'"+"WHERE NetID ="+ "'"+userName+"'"
	}
}
else if (action == 'USER-FOUND'){
    return{
		type: "USER-FOUND"
	}
}
else if (action == 'CHECK-USER'){
    return{
		type: "CHECK-USER",
		query:  "SELECT * FROM student_hours WHERE NetID ="+ "'"+userName+"'"
	}
}
else if (action == 'USER-NOT-APPROVED'){
    return{
		type: "USER-NOT-APPROVED"
	}
}
else if (action == 'USER-404'){
    return{
		type: "USER-404",
    status: false,
    user: ''
	}
}
else{
	return{
		type: "LOGGED-OUT"
	}
}
};
/*
IF USER IS NOT IN DB, DONT LET THEM SEE TIMECLOCK, JUST KICK THEM BACK TO HOME SCREEN

IF USER IS FOUND && MAC ADDRESS VALID, ALLOW CLOCK-IN, SHOW SUCCESS MESSAGE, LOGOUT, RETURN HOME

IF USER IS FOUND && WRONG MAC, SHOW ERROR MESSAGE, LOGOUT, RETURN HOME
*/