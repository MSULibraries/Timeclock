//Redux Action defines what will be the update to the state tree, based off the action creator.

export function LogAction (action,userName){ 
if (action == 'LOGGED-IN'){
    return{
		type: "LOGGED-IN",
  status: true,
  user: userName
	}
}
else{
	return{
		type: "LOGGED-OUT"
	}
}
};