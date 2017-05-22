//Redux Action defines what will be the update to the state tree, based off the action creator.

export function PrintTime (action,data){ 
if (action == "PRINT-TIME"){
    return{
		type: "PRINT-TIME",
    time: data
	 }
}

else{
	return{
		
	}
}
};