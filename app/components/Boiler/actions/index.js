//Redux Action defines what will be the update to the state tree, based off the action creator.

export function BoilerAction (action){ 
if (action == 'BOILER'){
    return{
		type: "BOILER-PASSED",
    status: true,
	}
}
else{
	return{
		type: "BOILER-FAILED",
    status: false
	}
}
};