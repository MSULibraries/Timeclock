//Redux Action defines what will be the update to the state tree, based off the action creator.

export function DeleteAction (action,userName){ 
if (action == 'DELETE-STUDENT'){
    return{
		type: "DELETE-STUDENT",
    user: userName,
    query: "UPDATE Users SET Status = 0  WHERE NetID='"+userName+"'"
	}
}
};