export const getStateDisplayText = (state, stateDisplayMap) => {
	
	let stateDisplayText = stateDisplayMap.filter(function(stateDisplayItem) {
		if (stateDisplayItem.state === state.state) {
			return stateDisplayItem;
		}
	   return undefined; 
	}, state);
	
	if (stateDisplayText[0]) {
		return stateDisplayText[0].apps.dmd.text
	} else {
		return '';
	}
}
