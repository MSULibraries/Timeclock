//Redux Action defines what will be the update to the state tree, based off the action creator.

export function ogAction (action,userName,dept = "4C-72-B9-55-CD-C3 "){ 
if (action == 'RETRIVE-STUDENTS'){
    return{
		type: "RETRIVE-STUDENTS",
    user: userName,
    status: 'Admin',
		dept: dept,
    query: "SELECT * FROM students WHERE Status= 'Student' AND Department = '" + dept + "'"
	}
}
else{
	return{
		type: "LOGGED-OUT"
	}
}
};