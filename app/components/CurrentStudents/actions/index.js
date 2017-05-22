//Redux Action defines what will be the update to the state tree, based off the action creator.

export function Action (action,department){ 
if (action == 'CURRENT-STUDENTS-ON-CLOCK'){
    return{
		type: "CURRENT-STUDENTS-ON-CLOCK",
    status: 'Admin',
   query: "SELECT NetID FROM student_hours WHERE UserLoggedIn=TRUE  AND  ( Department1=" + "'"+department+"' OR  Department2=" + "'"+department+"' OR Department3=" + "'"+department+"')"
	}
}
else{
	return{
		type: "LOGGED-OUT"
	}
}
};