//Redux Action defines what will be the update to the state tree, based off the action creator.
var d = new Date();
var n = d.toString();
var shortDate = d.toLocaleDateString();
export function ogAction (action,userName,dept){ 
if (action == 'RETRIVE-HOURS-TODAY'){
    return{
		type: "RETRIVE-HOURS-TODAY",
    user: userName,
    status: 'Admin',
		dept: dept,
    query: "SELECT TimeStamp FROM student_hours_elapsed WHERE ShortDate ='" + shortDate + "' AND NetID='" + userName  + "'" + "AND ClockIn = TRUE"
	}
}
else{
	return{
		type: "LOGGED-OUT"
	}
}
};