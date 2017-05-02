//Redux Action defines what will be the update to the state tree, based off the action creator.

export function LogAction (action,userName){ 
if (action == 'LOGGED-IN'){
    return{
		type: "LOGGED-IN",
    status: true,
    user: userName
	}
}
else if (action == 'USER-FOUND'){
    return{
		type: "USER-FOUND",
    status: false,
    user: ''
	}
}
else if (action == 'POPULATE-DASHBOARD'){
    return{
		type: "POPULATE-DASHBOARD",
    user: userName,
    query: "SELECT * FROM students WHERE NetID='" +userName+ "'"
	}
}
else if (action == 'DASHBOARD-DATA'){
    return{
		type: "DASHBOARD-DATA",
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