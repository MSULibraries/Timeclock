//Redux Action defines what will be the update to the state tree, based off the action creator.

export function RetriveDate (action,userName,dept, time){ 
if (action == 'RETRIVE-SPECIFIC-HOURS'){
    return{
		type: "RETRIVE-SPECIFIC-HOURS",
    user: userName,
		dept: dept,
		time: time,
    query: "SELECT TimeStamp FROM student_hours_elapsed WHERE NetID = '" + userName + "' AND ShortDate = '" + time + "'"
	}
}
else{
	return{
		
	}
}
};