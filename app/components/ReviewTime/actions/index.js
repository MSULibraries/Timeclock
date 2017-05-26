//Redux Action defines what will be the update to the state tree, based off the action creator.

export function ReviewTime (action,userName,time,dept){ 
if (action == "RETRIVE-STUDENT-TIME-TO-REVIEW"){
    return{
		type: "RETRIVE-STUDENT-TIME-TO-REVIEW",
    user: userName,
		time: time,
    query: "SELECT * FROM student_hours_elapsed WHERE ShortDate BETWEEN " + time + "AND NetID = '" + userName + "' AND (Dept= '00-00-00-00-00-00' OR Dept='"+dept+"')"
	}
}
else if(action == 'STUDENT-TIME-COMPUTED'){
	return{
		type: "STUDENT-TIME-COMPUTED",
		financialData: time
	}
}
else{
	return{
		
	}
}
};